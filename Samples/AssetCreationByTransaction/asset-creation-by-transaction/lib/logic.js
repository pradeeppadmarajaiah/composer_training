/**
 * Place an order for a vehicle
 * @param {org.acme.model.createLineItem} cli - the PlaceOrder transaction
 * @transaction
 */
function createLineItem(cli) {
    
    console.log('createLineItem');
    var factory = getFactory();
    var order= cli.lineItem.order;  
    
    //Check if arrray is null and intiliaze it.
     if (order.lineItem == null) {
              order.lineItem = [];
          }
     
    var lineItem = factory.newResource('org.acme.model', 'LineItem', cli.lineItem.getIdentifier());
    lineItem.lineItemDesc = cli.lineItem.lineItemDesc;
    
    lineItem.order = factory.newRelationship('org.acme.model', 'Order', order.getIdentifier());
    
    //This is for single object
   // order.lineItem=cli.lineItem;
    
    //This is for array
    order.lineItem = order.lineItem.concat(lineItem);
    
    
    return getAssetRegistry(lineItem.getFullyQualifiedType())
          .then(function (registry) {
              return registry.add(lineItem);
          }).then(function(){
              
      return getAssetRegistry('org.acme.model.Order').then(function (oRegistry){
        return oRegistry.update(order);
      })
      
      
             });  
    
  }