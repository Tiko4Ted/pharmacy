import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'
import {
  PhArrowLeft as ArrowLeft, PhCaretRight as CaretRight, PhMagnifyingGlass as MagnifyingGlass, PhChartLineUp as ChartLineUp, PhReceipt as Receipt, PhUsers as Users,
  PhCube as Box, PhUser as User, PhBell as Bell, PhStorefront as Storefront, PhCreditCard as CreditCard, PhTruck as Truck, PhWarning as Warning, PhDeviceMobile as DeviceMobile,
  PhList as List, PhX as Close, PhShoppingCart as ShoppingCart, PhPlus as Plus, PhCheck as Check, PhSignOut as SignOut,
} from '@phosphor-icons/vue'

const app = createApp(App)
const icons = { ArrowLeft, CaretRight, MagnifyingGlass, ChartLineUp, Receipt, Users, Box, User, Bell, Storefront, CreditCard, Truck, Warning, DeviceMobile, List, Close, ShoppingCart, Plus, Check, SignOut }
Object.entries(icons).forEach(([name, component]) => app.component(name, component))
app.mount('#app')
