document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
});

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => { 
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

const newProductModal = new bootstrap.Modal(document.getElementById('newProductModal'));

 on(document, 'click', '.btnNewProduct', e => {
   newProductModal.show();
});


document.getElementById('productRegister').addEventListener('submit', async function(event) {
    
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const stock = document.getElementById('stock').value;

    const p=document.getElementById("warnings");
    const s=document.getElementById("valid");

    let warnings = ""
    let send=false
    p.innerHTML = ""

    if(!name || !price || !category || !stock ){
        warnings+='All fields are required <br>';
        send=true
    }else{
    
        if(name.length < 3 || name.length > 20){
            warnings+='The name must contain between 3 and 20 characters <br>';
            send=true
        }

        const priceRegex = /^(\d{1,3}(\.\d{3}))$/;

        if(!priceRegex.test(price)){
            warnings+='Enter a valid price (With a point of a thousand) <br>';
            send=true
        }
    
        if (stock < 0) {
            warnings+='The stock must be greater than or equal to 0 <br>';
            send=true
        }
    
    
    }

    if(send){
        p.innerHTML =warnings
        return;
    }

    await fetch('/product/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            category,
            price,
            stock
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            s.innerHTML = data.message;

            setTimeout(() => {
                s.innerHTML = ""; 
                p.innerHTML = ""; 
                newProductModal.hide();
                location.reload();
            }, 3000);
            document.getElementById('productRegister').reset();
        } else {
            p.innerHTML = data.error; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    });

});

const updateProductModal = new bootstrap.Modal(document.getElementById('updateProductModal'));
// Mostrar modal y cargar datos del producto para actualizar
document.addEventListener('click', async function (e) {
    if (e.target && e.target.classList.contains('btnUpdate')) {
        const row = e.target.closest('tr');
        const productId = row.getAttribute('data-id');

        // Realiza una solicitud GET para obtener los datos del producto
        const response = await fetch(`/product/getProduct/${productId}`);
        if (!response.ok) {
            alert('Error fetching product data');
            return;
        }

        const productData = await response.json();
        console.log('Fetched product data:', productData);

        // Prellenar los campos del modal con los datos del producto
        document.getElementById('idUpdate').value = productData._id;
        document.getElementById('nameUpdate').value = productData.name;
        document.getElementById('priceUpdate').value = productData.price;
        document.getElementById('categoryUpdate').value = productData.category;
        document.getElementById('stockUpdate').value = productData.stock;

        // Mostrar el modal de actualización
        
        updateProductModal.show();
    }
});

// Enviar los datos actualizados al backend cuando el formulario es enviado
document.getElementById('updatePoductForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const idUpdate = document.getElementById('idUpdate').value;
    const nameUpdate = document.getElementById('nameUpdate').value;
    const priceUpdate = document.getElementById('priceUpdate').value;
    const categoryUpdate = document.getElementById('categoryUpdate').value;
    const stockUpdate = document.getElementById('stockUpdate').value;

    // Validación simple
    const warnings = document.getElementById('warnings2');
    const valid = document.getElementById('valid2');
    warnings.innerHTML = "";
    valid.innerHTML = "";

    if (!nameUpdate || !priceUpdate || !categoryUpdate || !stockUpdate) {
        warnings.innerHTML = 'All fields are required.';
        return;
    }

    // Enviar los datos actualizados al servidor
    const response = await fetch('/product/editProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idUpdate,
            nameUpdate,
            priceUpdate,
            categoryUpdate,
            stockUpdate
        })
    });

    const result = await response.json();
    if (result.error) {
        warnings.innerHTML = result.error;
    } else {
        valid.innerHTML = 'Product updated successfully!';
        setTimeout(() => {
            valid.innerHTML = "";
            updateProductModal.hide();
            location.reload(); // Recargar la página para mostrar los datos actualizados
        }, 2000);
    }
});





document.querySelector('#tableProducts').addEventListener('click', async function (event) {
    if (event.target.closest('.btnDelete')) { 
        const deleteButton = event.target.closest('.btnDelete');
        const petId = deleteButton.getAttribute('data-id');

        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`/product/deleteProduct/${petId}`, {
                    method: 'DELETE'
                });

                const data = await response.json();
                if (!data.error) {
                    alert('Product deleted successfully');
                    location.reload();
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting product. Please try again.');
            }
        }
    }
});