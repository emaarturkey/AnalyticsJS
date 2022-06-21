if (location.protocol != 'https:')
{
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

function get_basket_json(position) {
      jsonObj = [];
      var foo = 0;
      $('table.basketly tbody tr').each(function() {
            item = {}
            item ["name"] = $('#name',this).val();
            item ["id"] = $('#id',this).val();
            item ["category"] = $('#category',this).val();
            item ["quantity"] = $('#quantity',this).val();
            item ["brand"] = 'Emaar Aquarium';
            if(position==true){ item ["position"] = foo; }
            jsonObj.push(item);
            foo++;
      });

      return JSON.stringify(jsonObj);
}

// >>> LOADING STEP 1

	$('.btn-warning').click(function() {
    	if($('#bilet-tutari').html() == '0 TL') {
			var basketCounter = 0;
			while(basketCounter < 1) {
				dataLayer.push ({
					'event': 'checkout',
					'ecommerce': {
						'checkout': {
							'actionField': {
								'step': 1
							}
						}
					}
				});
				basketCounter ++;
			}
		}
	});

// >>> SENDING DATA TO STEP 1 and LOADING STEP 2

	$('.main .btn-success').click(function() {
		dataLayer.push ({
			'event': 'checkout',
			'ecommerce': {
				'checkout': {
					'actionField': {
						'step': 1
					},
					'products': get_basket_json(false) // NOT SURE IF IT SHOULD BE "false" OR "true"
				}
			}
		}); // Data was sent to Step 1
		dataLayer.push ({
			'event': 'checkout',
			'ecommerce': {
				'checkout': {
					'actionField': {
						'step': 2
					},
					'products': get_basket_json(false)  // NOT SURE IF IT SHOULD BE "false" OR "true"
				}
			}
		}); // Step 2 Loaded
	});

// >>> SENDING DATA TO STEP 2 and LOADING STEP 3

	$('.form-control').keyup(function() {
	    if($('#fullname').val()!='' && $('#email').hasClass('valid') && $('#phone').hasClass('valid')) {
			dataLayer.push ({
				'event': 'checkout',
				'ecommerce': {
					'checkout': {
						'actionField': {
							'step': 2
						},
						'products': get_basket_json(false)  // NOT SURE IF IT SHOULD BE "false" OR "true"
					}
				}
			});
			dataLayer.push ({
				'event': 'checkout',
				'ecommerce': {
					'checkout': {
						'actionField': {
							'step': 3
						},
						'products': get_basket_json(false)  // NOT SURE IF IT SHOULD BE "false" OR "true"
					}
				}
			});
		}
	});

// >>> SENDING DATA TO STEP 3 and TRIGGERING PURCHASE 

/* 
*** IMPORTANT: The following function MUST ONLY be triggered after successful Javascript 
	(form validation) and POS (payment gateway) validation (success: function(data) {...})
*/
	
	$('#form .btn-success').click(function() {
		dataLayer.push ({
			'event': 'checkout',
			'ecommerce': {
				'checkout': {
					'actionField': {
						'step': 3
					},
					'products': get_basket_json(false)
				},
				// *** This is new ***
				'crmData': {
					'bankName': result,
					'cardType': $('.card img').attr('alt')
				}
			}
		}); // Data was sent to Step 3
		dataLayer.push ({
			'event': 'eePurchase',
			'ecommerce': {
				'purchase': {
					'actionField': {	
						'id': data.id, 
	                  	'affiliation': 'Emaar Aquarium Website',
	                  	'revenue': data.revenue, 
	                  	'tax': data.tax,
	                  	'coupon': data.coupon // This variabe is not defined yet
					},
					products: get_basket_json(true)
				}
			}
		}); // Purchase completed
	});
	
	
// >>> ADD/REMOVE TO BASKET FUNCTIONS
	
	/*
		No changes here, the fucntion is working properly
	*/
	$('#billing').change(function(){
		if($(this)[0].checked==true){ 
			dataLayer.push ({
				'event': 'checkoutOption',
				'ecommerce': {
					'checkout_option': {
						'actionField': {
							'step': 2,
							'option': 'Ticket Counter Collection'
						}
					}
				}
			});
		}
	});
	
	/*
		No changes here, the fucntion is working properly
	*/
	
	$('#3d').change(function() {
		if($(this)[0].checked==true) { 
			$('#form .btn-submit[type=button]').hide();
			$('#form .btn-submit[type=submit]').show();
			dataLayer.push ({
				'event': 'checkoutOption',
				'ecommerce': {
					'checkout_option': {
						'actionField': {
							'step': 3,
							'option': '3D Payment'
						} 
					}
				}
			});
		}
		else {
			$('#form .btn-submit[type=button]').show();
			$('#form .btn-submit[type=submit]').hide();
		}
	});
	
	/*
		*** DELETE THIS FUNCTION ***
	
	$('#newsletter').change(function(){
		if($(this)[0].checked==true){ 
			dataLayer.push ({
				'event': 'checkoutOption',
				'ecommerce': {
					'checkout_option': {
						'actionField': {
							'step': 2,
							'option': 'Newsletter Opt-in'
						}
					}
				}
			});
		}
	});
	
	*/

// >>> IMPRESSIONS & PRODUCT DETAILS
	
	/*
		This funciton should only be loaded on this page: https://bilet.emaarakvaryum.com/index.php NOT here: https://bilet.emaarakvaryum.com/odeme.php
	*/
	
	
	$(window).load(function () {
		if($(location).attr('href') == 'https://bilet.emaarakvaryum.com/index.php') {
			dataLayer.push({
				'ecommerce': {
					'event': 'eeProductImpressions',
					'currencyCode': 'TRY',
					'impressions': [{
						'name': 'Aile Paketi',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Regular Ticket',
						'list': 'Sales Funnel',
						'position': 0
					},
					{
						'name': 'Yetişkin',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Regular Ticket',
						'list': 'Sales Funnel',
						'position': 1
					},
					{
						'name': 'Çocuk',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Regular Ticket',
						'list': 'Sales Funnel',
						'position': 2
					},
					{
						'name': 'Öprenci ve Öğretmen',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Regular Ticket',
						'list': 'Sales Funnel',
						'position': 3
					},
					{
						'name': 'Yaş 65+ ve Üstü',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Regular Ticket',
						'list': 'Sales Funnel',
						'position': 4
					},
					{
						'name': 'Yaş 0-36 Ay',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Regular Ticket',
						'list': 'Sales Funnel',
						'position': 5
					},
					{
						'name': 'Aile Paketi Çocuk İvalesi',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Regular Ticket',
						'list': 'Sales Funnel',
						'position': 6
					},
					{
						'name': 'Yıllık Üyelik Yetişkin',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Annual Membership',
						'list': 'Sales Funnel',
						'position': 7
					},
					{
						'name': 'Yıllık Üyelik Çocuk',
						'id': '[TICKET SKU]',
						'price': '[TICKET PRICE]',
						'brand': 'Emaar Aquarium', 
						'category': 'Annual Membership',
						'list': 'Sales Funnel',
						'position': 8
					}], // End of impressions
					'detail': {
						'event': 'eeProductDetail'
						'actionField': {
							'list': 'Sales Funnel'
						},
						'products': [{
							'name': 'Aile Paketi',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Regular Ticket'
						},
						{
							'name': 'Yetişkin',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Regular Ticket'
						},
						{
							'name': 'Çocuk',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Regular Ticket'
						},
						{
							'name': 'Öprenci ve Öğretmen',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Regular Ticket'
						},
						{
							'name': 'Yaş 65+ ve Üstü',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Regular Ticket'			},
						{
							'name': 'Yaş 0-36 Ay',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Regular Ticket'
						},
						{
							'name': 'Aile Paketi Çocuk İvalesi',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Regular Ticket'
						},
						{
							'name': 'Yıllık Üyelik Yetişkin',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Annual Membership'
						},
						{
							'name': 'Yıllık Üyelik Çocuk',
							'id': '[TICKET SKU]',
							'price': '[TICKET PRICE]',
							'brand': 'Emaar Aquarium', 
							'category': 'Annual Membership'
						}]
					}
				}
			});
		}
	});
	
	
	
	$(window).load(function () {
		if($(location).attr('href') == 'https://bilet.emaarakvaryum.com/odeme.php') {
			dataLayer.push ({
				'event': 'checkout',
				'ecommerce': {
					'checkout': {
						'actionField': {
							'step': 2
						}
					}
				}
			}); // Step 2 Loaded
		}
	});
