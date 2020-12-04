const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "j95ytf35t4z52ny3",
  publicKey: "byyhfk4pr2zfbc9x",
  privateKey: "68cd97cb512e95ad5a9200cc3e39c865"
});

exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
        // pass clientToken to your front-end
        if (err) {
            res.status(500).send(err)
            
        } else{
            res.send(response)

        }
      });
};

exports.processPayment=(req,res)=>{
    
    let nonceFromTheClient=req.body.paymentMethodNonce

    let amountFromTheClient=req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if (err) {
              res.status(500).json(error)
              
          } else {
              res.json(result)
              
          }
      });
    
};