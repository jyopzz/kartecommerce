document.addEventListener('DOMContentLoaded', function() {
    var rows = document.querySelectorAll('.mainbody tr');
    var cartSubtotalElement = document.getElementById('cartSubtotal');
    var shippingChargeElement = document.getElementById('shippingcharge');
    var youSaveElement = document.getElementById('yousave');
    var youPayElement = document.getElementById('youpay');
    var couponInput = document.querySelector('.couponinput');
  
    function calculateTotalPrice() {
      var cartSubtotal = 0;
  
      for (var i = 0; i < rows.length; i++) {
        var quantitySelect = rows[i].querySelector('select[name="qnty"]');
        var priceElement = rows[i].querySelector('.price span');
        var totalPriceElement = rows[i].querySelector('.total-price');
  
        var quantity = parseInt(quantitySelect.value, 10) || 0;
        var price = parseFloat(priceElement.textContent.trim()) || 0;
        var totalPrice = quantity * price;
  
        totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
        cartSubtotal += totalPrice;
      }
  
      cartSubtotalElement.textContent = '$' + cartSubtotal.toFixed(2);
  
      var shippingCharge = parseFloat(shippingChargeElement.textContent.trim()) || 0;
      var youSave = parseFloat(youSaveElement.textContent.trim()) || 0;
  
      var youPay = cartSubtotal + shippingCharge - youSave;
      youPayElement.textContent = '$' + youPay.toFixed(2);
    }
  
    function updateYouSave() {
      var couponValue = couponInput.value.trim().toUpperCase();
      var youSave = 0;
  
      if (couponValue === 'EC2') {
        var cartSubtotal = parseFloat(cartSubtotalElement.textContent.slice(1)) || 0;
        var shippingCharge = parseFloat(shippingChargeElement.textContent.slice(1)) || 0;
        
        youSave = 50 + shippingCharge; // Set the discount value for "EC2" coupon and include shipping charge
        
        cartSubtotal -= shippingCharge; // Subtract shipping charge from cartSubtotal
        cartSubtotalElement.textContent = '$' + cartSubtotal.toFixed(2);
      }
  
      youSaveElement.textContent = '$' + youSave.toFixed(2);
  
      var cartSubtotal = parseFloat(cartSubtotalElement.textContent.slice(1)) || 0;
      var shippingCharge = parseFloat(shippingChargeElement.textContent.trim()) || 0;
  
      var youPay = cartSubtotal + shippingCharge - youSave;
      youPayElement.textContent = '$' + youPay.toFixed(2);
    }
  
    couponInput.addEventListener('input', updateYouSave);
  
    for (var i = 0; i < rows.length; i++) {
      var quantitySelect = rows[i].querySelector('select[name="qnty"]');
      quantitySelect.addEventListener('change', calculateTotalPrice);
    }
  
    calculateTotalPrice();
  });
