function validateform() {
        �var�x=document.getElementById('name').value;
         var letters = /^[A-Za-z]+$/;
         var numbers = /^[0-9]+$/;

      �� if�(x ==�null�|| x ==�"") {
       ����� � alert("Name must be filled out");
        �������return�false;
          }
          else if (x.length>20)
          {
              alert("Name cannot be greater than 20 characters.");
              //x="";
              //document.myForm.name.focus();
              return false;
           }
           else if(!x.match(letters))
            {
               alert('Please input alphabet characters only');
               return false;
             }
            
          var�y=document.getElementById('phone').value;    
          if(y=="")
          {
               alert("Please enter the Contact number.");
               //y="";
             // document.myForm.phone.focus();
              return false;
          }
          else if (!y.match(numbers))
           {
              alert('Please enter the phone number in digits only');
              return false;
           }
          else if(y.length!=10)
          {
             alert("Contact number should contain only 10 digits");
            // y="";
             //document.myForm.phone.focus();
            return false;
          }

         var emailID = document.getElementById('email').value;
         atpos = emailID.indexOf("@");
         dotpos = emailID.lastIndexOf(".");
         
         if (atpos < 1 || ( dotpos - atpos < 2 )) 
         {
            alert("Please enter correct email ID");
             emailID="";
            document.myForm.email.focus() ;
            return false;
         }

}
