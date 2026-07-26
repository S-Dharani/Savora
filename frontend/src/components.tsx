import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import {Search, ShoppingBag, Sun, Moon, Menu, Star, Plus} from 'lucide-react';
import {useState} from 'react';
import {motion} from 'framer-motion';
import {useCart} from './store';

function signedIn(){ return Boolean(localStorage.getItem('access')); }
function isAdmin(){ try { return JSON.parse(atob(localStorage.getItem('access')!.split('.')[1])).role === 'ADMIN'; } catch { return false; } }

export function Layout({children}:any) {
  const [dark,setDark] = useState(false), [open,setOpen] = useState(false);
  const {cart} = useCart();
  useLocation();
  const loggedIn = signedIn();
  const admin = isAdmin();
  return <div className={dark?'dark min-h-screen':'min-h-screen'}>
    <div className="orb bg-violet w-70 h-70 -top-20 -left-20"/><div className="orb bg-mint w-70 h-70 right-0 top-80"/>
    <header className="sticky top-3 z-30 mx-auto max-w-7xl px-4"><nav className="glass flex items-center justify-between rounded-2xl px-4 py-3">
      <Link to="/" className="text-xl font-black tracking-tight">sav<span className="text-violet">ora</span><i className="ml-1 inline-block h-2 w-2 rounded-full bg-mint"/></Link>
      <div className="hidden gap-6 text-sm font-semibold md:flex"><NavLink to="/restaurants">Discover</NavLink><NavLink to="/orders">Orders</NavLink>{admin&&<NavLink to="/admin">Admin</NavLink>}</div>
      <div className="flex items-center gap-2"><button className="btn p-2" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button><Link to="/cart" className="btn relative p-2"><ShoppingBag size={18}/>{cart.length>0&&<b className="absolute -right-1 -top-1 rounded-full bg-violet px-1.5 text-[10px] text-white">{cart.length}</b>}</Link><button className="btn p-2 md:hidden" onClick={()=>setOpen(!open)}><Menu size={18}/></button>{loggedIn?<Link to="/login" onClick={()=>localStorage.removeItem('access')} className="btn btn-primary hidden sm:inline-flex">Sign out</Link>:<Link to="/login" className="btn btn-primary hidden sm:inline-flex">Sign in</Link>}</div>
    </nav>{open&&<div className="glass mt-2 flex flex-col gap-3 rounded-xl p-4 text-sm md:hidden"><Link to="/restaurants">Discover</Link><Link to="/orders">Orders</Link>{admin&&<Link to="/admin">Admin</Link>}</div>}</header>
    <main className="relative mx-auto max-w-7xl px-4 pb-16">{children}</main><footer className="mx-auto max-w-7xl px-4 pb-8 text-center text-sm opacity-60">Made for good meals and easy moments · Savora</footer>
  </div>
}
export function SearchBar(){const [q,setQ]=useState('');const nav=useNavigate();return <form onSubmit={e=>{e.preventDefault();nav('/search?q='+q)}} className="glass flex w-full items-center gap-3 rounded-2xl p-2"><Search className="ml-2 opacity-55"/><input className="w-full bg-transparent py-2 outline-none" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search dishes, cuisines, restaurants..."/><button className="btn btn-primary">Search</button></form>}
export function FoodCard({food}:any){const {add}=useCart();return <motion.article whileHover={{y:-5}} className="glass card group"><Link to={`/foods/${food.id}`}><img className="h-40 w-full object-cover" src={food.image} alt={food.name}/></Link><div className="p-4"><div className="mb-1 flex items-center justify-between"><h3 className="font-bold">{food.name}</h3><span className="flex items-center gap-1 text-xs text-amber-500"><Star size={13} fill="currentColor"/>{food.rating}</span></div><p className="mb-3 line-clamp-2 text-sm opacity-65">{food.description}</p><div className="flex items-center justify-between"><b>₹{food.price}</b><button onClick={()=>add(food)} className="btn btn-primary p-2"><Plus size={17}/></button></div></div></motion.article>}
export function RestaurantCard({restaurant:r}:any){return <motion.article whileHover={{y:-5}} className="glass card"><Link to={`/restaurants/${r.slug}`}><img className="h-44 w-full object-cover" src={r.image} alt={r.name}/><div className="p-4"><div className="flex justify-between gap-3"><h3 className="font-bold">{r.name}</h3><b className="text-sm text-amber-500">★ {r.rating}</b></div><p className="mt-1 text-sm opacity-60">{r.cuisine}</p><p className="mt-3 text-xs opacity-55">{r.deliveryMinutes} min · ₹{r.deliveryFee} delivery</p></div></Link></motion.article>}
