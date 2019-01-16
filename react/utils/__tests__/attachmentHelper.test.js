import { optionPricePerItem, parentPricePerUnit } from '../attachmentHelper'

const mock = {  
  "productName":"Super Suprema Large",
  "linkText":"super-suprema",
  "sku":{  
     "seller":{  
        "commertialOffer":{  
           "Price":166.35000000000002
        }
     },
     "name":"Large",
     "itemId":"35",
     "image":{  
        "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155442-240-auto?width=240&height=auto&aspect=true"
     }
  },
  "addedOptions":[  
     {  
        "productName":"Ham",
        "linkText":"ham",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":13.200000000000001
              }
           },
           "name":"Ham",
           "itemId":"8",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155432-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":6,
        "isSingleChoice":false,
        "optionType":"Toppings"
     },
     {  
        "productName":"Ham",
        "linkText":"ham",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":0
              }
           },
           "name":"Ham",
           "itemId":"8",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155432-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":3,
        "isSingleChoice":false,
        "optionType":"Basic Toppings"
     },
     {  
        "productName":"Pepperoni",
        "linkText":"pepperoni",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":21
              }
           },
           "name":"Pepperoni",
           "itemId":"9",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155428-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":6,
        "isSingleChoice":false,
        "optionType":"Toppings"
     },
     {  
        "productName":"Pepperoni",
        "linkText":"pepperoni",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":0
              }
           },
           "name":"Pepperoni",
           "itemId":"9",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155428-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":3,
        "isSingleChoice":false,
        "optionType":"Basic Toppings"
     },
     {  
        "productName":"Green Pepper",
        "linkText":"green-pepper",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":1.9500000000000002
              }
           },
           "name":"Green Pepper",
           "itemId":"37",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155431-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":3,
        "isSingleChoice":false,
        "optionType":"Toppings"
     },
     {  
        "productName":"Green Pepper",
        "linkText":"green-pepper",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":0
              }
           },
           "name":"Green Pepper",
           "itemId":"37",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155431-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":3,
        "isSingleChoice":false,
        "optionType":"Basic Toppings"
     },
     {  
        "productName":"Black Olives",
        "linkText":"black-olives",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":0
              }
           },
           "name":"Black Olives",
           "itemId":"36",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155430-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":3,
        "isSingleChoice":false,
        "optionType":"Basic Toppings"
     },
     {  
        "productName":"Champignon",
        "linkText":"champignon",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":0
              }
           },
           "name":"Champignon",
           "itemId":"10",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155436-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":3,
        "isSingleChoice":false,
        "optionType":"Basic Toppings"
     },
     {  
        "productName":"Onion",
        "linkText":"onion",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":0
              }
           },
           "name":"Onion",
           "itemId":"11",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155427-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":3,
        "isSingleChoice":false,
        "optionType":"Basic Toppings"
     },
     {  
        "productName":"Hut Cheese",
        "linkText":"hut-cheese",
        "sku":{  
           "seller":{  
              "commertialOffer":{  
                 "Price":55.800000000000004
              }
           },
           "name":"Hut Cheese",
           "itemId":"25",
           "image":{  
              "imageUrl":"https://delivery.vteximg.com.br/arquivos/ids/155415-240-auto?width=240&height=auto&aspect=true"
           }
        },
        "addedOptions":[  

        ],
        "quantity":3,
        "isSingleChoice":true,
        "optionType":"Crust"
     }
  ],
  "quantity":3
}

/** Create fake ham with:
 * const ham = createProductSummaryOption({
    product: {
      name: 'Ham',
      sellingPrice: 2.2,
      id: '8',
      quantity: 6,
    },
    optionType: 'Toppings',
  })
 */

const createProductSummaryProduct = ({ name, sellingPrice, id, quantity, sellerId, options }) => ({
  productName: name || 'default',
  sku: {
    seller: {
      commertialOffer: {
        Price: (sellingPrice || 10) * (quantity || 0) + (options || []).reduce((total, op) => op.sku.seller.commertialOffer.Price + total, 0),
      },
      sellerId: sellerId || '1',
    },
    name: name || 'default',
    itemId: id || '1',
  },
  quantity: quantity || 1,
  addedOptions: options,
})

const createProductSummaryOption = ({ product, isSingleChoice = false, optionType = 'Toppings' }) => ({
  ...createProductSummaryProduct(product),
  isSingleChoice,
  optionType,
})

it('should calculate proper price per unit of parent item on orderForm', () => {
  expect(parentPricePerUnit(mock).toFixed('2')).toBe('24.80')
})

it('should correctly calculate attachment cost on each parent item', () => {
  const ham = mock.addedOptions.find(({ optionType, productName }) => optionType === 'Toppings' && productName === 'Ham')
  const pepperoni = mock.addedOptions.find(({ optionType, productName }) => optionType === 'Toppings' && productName === 'Pepperoni')
  const greenpepper = mock.addedOptions.find(({ optionType, productName }) => optionType === 'Toppings' && productName === 'Green Pepper')
  const crust = mock.addedOptions.find(({ optionType, productName }) => optionType === 'Crust' && productName === 'Hut Cheese')
  const costHam = optionPricePerItem(ham, mock)
  const costGreenPepper = optionPricePerItem(greenpepper, mock)
  const costPepperoni = optionPricePerItem(pepperoni, mock)
  const costCrust = optionPricePerItem(crust, mock)
  expect(costHam.toFixed(2)).toBe('4.40')
  expect(costGreenPepper.toFixed(2)).toBe('0.65')
  expect(costPepperoni.toFixed(2)).toBe('7.00')
  expect(costCrust.toFixed(2)).toBe('18.60')
})