import React , {useState,useEffect}from 'react'
import Navbar from "./Navbar"
import Products from './Products'
import {auth,db} from "../config/firebase_config"
import { collection,getDocs,setDoc,doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'






function Home() {

  const navigate = useNavigate()
// Show User Name Thorugh State
    const [userName,setUserName] = useState("")
    // Use Effect is used to set user name on authentication
  useEffect(() => {
   
    auth.onAuthStateChanged((user)=>{
      if(user){
        // Set username is assigned displayName property of firebase
        setUserName(user.displayName)
      }else {
        setUserName("")
      }
      console.log(user)
    })
   
  }, []);


  // States for Getting Products
const [products,setProducts]= useState([])
const productsRef= collection(db,"Products");
useEffect(() => {
  const getProducts =  async ()=>{
    try {
      const  data = await  getDocs(productsRef);
  const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  // console.log(filteredData)
  setProducts(filteredData)
    } catch (error) {
      console.error(error)
    }
  
  
  }
  getProducts();

  
}, []);




// Getting Current User Uid
function GettingUserUid(){
  const [uid,setUid]= useState(null)
  useEffect(() => {
   auth.onAuthStateChanged(user=>{
    if(user){
      setUid(user.uid)
    }
   })
  
    
  }, []);
  return uid;
}
// Getting uid from function in a variable
const uid = GettingUserUid() 

let Product;
// Add to Cart Function
const addtoCart = async (product)=>{
  if(uid!==null){
  // console.log(product)
  Product = product;
  Product['qty']=1;
  Product['TotalProductPrice']=Product.qty*Product.Price;
  // Setting Collection to Firebase
try {
  await setDoc(doc(db,"Cart "+uid,product.id),{
    product
  })
} catch (error) {
  console.error(error)
}

  }
  else {
navigate("/login")
  }
  }

  return (
    <div>
   

      {/* UserName is passed as prop */}
         <Navbar name={userName}/>
         {/* Condition is set for Products */}
         <div className='container mx-auto'>
         
         {products.length>0 && <>
         
          <Products products={products} addtoCart={addtoCart}/>
         
         
         </>}
         {products.length<1 && <>
         
         <h1 className='text-center'>Please Wait....</h1>
        
        
        </>}

   
    </div>
    </div>
  )
}

export default Home