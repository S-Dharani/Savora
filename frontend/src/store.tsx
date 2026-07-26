import {createContext,useContext,useEffect,useState} from 'react';
export type CartItem={id:number;name:string;price:number;image:string;quantity:number};
type Store={cart:CartItem[];add:(food:any)=>void;change:(id:number,quantity:number)=>void};
const CartContext=createContext<Store>(null!);
export function CartProvider({children}:{children:React.ReactNode}){
  const [cart,setCart]=useState<CartItem[]>(()=>JSON.parse(localStorage.getItem('cart')||'[]'));
  useEffect(()=>localStorage.setItem('cart',JSON.stringify(cart)),[cart]);
  const add=(food:any)=>setCart(items=>{const current=items.find(item=>item.id===food.id);return current?items.map(item=>item.id===food.id?{...item,quantity:item.quantity+1}:item):[...items,{id:food.id,name:food.name,price:Number(food.price),image:food.image,quantity:1}]});
  const change=(id:number,quantity:number)=>setCart(items=>quantity<1?items.filter(item=>item.id!==id):items.map(item=>item.id===id?{...item,quantity}:item));
  return <CartContext.Provider value={{cart,add,change}}>{children}</CartContext.Provider>;
}
export const useCart=()=>useContext(CartContext);
