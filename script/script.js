
   const form = document.getElementById('customerForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const type = document.getElementById('type').value;

      if (!name || !email || !phone || !address || !type) {
        message.textContent = 'Please fill all fields!';
        message.className = 'message error';
        return;
      }

      message.textContent = 'Customer added successfully!';
      message.className = 'message success';

      form.reset();
    });