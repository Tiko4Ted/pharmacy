<script setup>
import { computed, ref } from 'vue'
import {
  PhArrowLeft as ArrowLeft,
  PhArrowRight as ArrowRight,
  PhBell as Bell,
  PhCube as Box,
  PhCheck as Check,
  PhCaretRight as CaretRight,
  PhChartLineUp as ChartLineUp,
  PhCreditCard as CreditCard,
  PhDeviceMobile as DeviceMobile,
  PhDownloadSimple as DownloadSimple,
  PhHouse as House,
  PhMagnifyingGlass as MagnifyingGlass,
  PhList as List,
  PhPackage as Package,
  PhX as Close,
  PhPlus as Plus,
  PhReceipt as Receipt,
  PhShoppingCart as ShoppingCart,
  PhSignOut as SignOut,
  PhStorefront as Storefront,
  PhTruck as Truck,
  PhUser as User,
  PhUsers as Users,
  PhUsersThree as UsersThree,
  PhWarning as Warning,
} from '@phosphor-icons/vue'

const currentScreen = ref('login')
const toast = ref('')
const search = ref('')
const menuOpen = ref(false)

// Local-only fixture data for UI review. This is intentionally static until the API layer is added.
const mockData = {
  shop: { owner: 'Wanjiku Kamau', name: 'Corner Shop', phone: '+254 712 345 678' },
  dashboard: {
    todaySales: 'KES 48,650', yesterdayChange: '+12% vs yesterday', receipts: 23,
    mpesaToday: 'KES 31,200', mpesaShare: '64% of sales', debts: 'KES 86,400', debtCustomers: 23,
    weeklySales: [28, 36, 31, 48, 42, 58, 48],
    weeklyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'],
    topProducts: [
      { name: 'Unga Maize Flour 2kg', units: 42, revenue: 'KES 6,300' },
      { name: 'Bidco Cooking Oil 1L', units: 28, revenue: 'KES 8,960' },
      { name: 'Brookside Milk 500ml', units: 64, revenue: 'KES 3,840' },
    ],
  },
  sales: [
    { initials: 'WK', name: 'Wanjiku Kamau', receipt: '#RC-2048 · 4:12 PM · 6 items', amount: 'KES 1,850', badge: 'M-Pesa' },
    { initials: 'OO', name: 'Otieno Odhiambo', receipt: '#RC-2047 · 3:40 PM · 3 items', amount: 'KES 620', badge: 'Cash' },
    { initials: 'AM', name: 'Aisha Mohamed', receipt: '#RC-2046 · 2:55 PM · 11 items', amount: 'KES 3,400', badge: 'Credit' },
    { initials: 'KC', name: 'Kiprono Cheruiyot', receipt: '#RC-2045 · 1:28 PM · 8 items', amount: 'KES 2,780', badge: 'M-Pesa' },
    { initials: 'HA', name: 'Hassan Ali', receipt: '#RC-2044 · 12:15 PM · 4 items', amount: 'KES 950', badge: 'Cash' },
  ],
  customers: [
    ['WK', 'Wanjiku Kamau', '0712 345 678 · Kawagware', 'KES 0', 'Cleared'],
    ['OO', 'Otieno Odhiambo', '0722 910 442 · Kilimani', 'KES 4,200', 'Owing'],
    ['AM', 'Aisha Mohamed', '0733 218 905 · Eastleigh', 'KES 12,500', 'Owing'],
    ['MN', 'Mwangi Njoroge', '0745 673 009 · Githurai', 'KES 9,800', 'Overdue'],
    ['HA', 'Hassan Ali', '0711 802 664 · South B', 'KES 15,000', 'Owing'],
  ],
  suppliers: [
    { initials: 'UG', name: 'Unga Group Ltd', receipt: 'Maize & wheat flour', amount: 'KES 62,000', badge: 'Owed' },
    { initials: 'BA', name: 'Bidco Africa', receipt: 'Cooking oil, soap', amount: 'KES 48,500', badge: 'Owed' },
    { initials: 'BD', name: 'Brookside Dairy', receipt: 'Milk, yoghurt', amount: 'KES 0', badge: 'Paid' },
    { initials: 'KC', name: 'Kenafric Industries', receipt: 'Biscuits, sweets', amount: 'KES 22,300', badge: 'Owed' },
  ],
  stock: [
    ['UM', 'Unga Maize Flour 2kg', 'Price KES 150', '4 left', 'Low'],
    ['BC', 'Bidco Cooking Oil 1L', 'Price KES 320', '2 left', 'Low'],
    ['BM', 'Brookside Milk 500ml', 'Price KES 60', '6 left', 'Reorder'],
    ['SK', 'Soko Maize Meal 2kg', 'Price KES 170', '0 left', 'Out'],
    ['BR', 'Brookside Yoghurt 500ml', 'Price KES 120', '9 left', 'Healthy'],
  ],
}

const screens = [
  'create-account', 'create-pin', 'login', 'profile', 'dashboard', 'sales',
  'new-sale', 'payment-received', 'customers', 'add-customer', 'suppliers',
  'add-supplier', 'stock',
]

const screenIndex = computed(() => screens.indexOf(currentScreen.value))
const isAppScreen = computed(() => screenIndex.value >= 3)

const navigate = (screen) => {
  currentScreen.value = screen
  search.value = ''
  menuOpen.value = false
  window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
}

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const showToast = (message) => {
  toast.value = message
  window.clearTimeout(showToast.timer)
  showToast.timer = window.setTimeout(() => { toast.value = '' }, 2400)
}

const filteredCustomers = computed(() => {
  return mockData.customers.filter((row) => row.join(' ').toLowerCase().includes(search.value.toLowerCase()))
})

const filteredStock = computed(() => {
  return mockData.stock.filter((row) => row.join(' ').toLowerCase().includes(search.value.toLowerCase()))
})

const filteredSales = computed(() => mockData.sales.filter((row) => Object.values(row).join(' ').toLowerCase().includes(search.value.toLowerCase())))

const statusClass = (status) => status === 'Cleared' ? 'status cleared' : status === 'Overdue' ? 'status overdue' : 'status owing'
const AppHeader = { props: ['title', 'subtitle', 'back', 'homeHeader'], emits: ['back', 'menu'], template: `<div class="page-header" :class="{ 'home-header': homeHeader }"><button v-if="back !== false" class="back-button" @click="$emit('back')"><ArrowLeft :size="20" weight="regular" /></button><div><h1>{{ title }}</h1><p>{{ subtitle }}</p></div><button class="page-menu-trigger" aria-label="Open menu" @click="$emit('menu')"><List :size="21" weight="regular" /></button></div>` }
const PageHeader = { props: ['title', 'subtitle', 'placeholder', 'modelValue'], emits: ['update:modelValue', 'menu'], template: `<div class="page-header"><div><h1>{{ title }}</h1><p>{{ subtitle }}</p></div><button class="page-menu-trigger" aria-label="Open menu" @click="$emit('menu')"><List :size="21" weight="regular" /></button><div class="search-field"><MagnifyingGlass :size="19" weight="regular" /><input :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" /></div></div>` }
const ListRow = { props: ['icon', 'label'], template: `<button class="list-row"><component :is="icon" :size="21" /><span>{{ label }}</span><CaretRight :size="18" /></button>` }
const QuickAction = { props: ['icon', 'label'], template: `<button class="quick-action"><span><component :is="icon" :size="22" /></span><small>{{ label }}</small></button>` }
const MetricCard = { props: ['label', 'value', 'note', 'icon', 'warning'], template: `<div class="metric-card"><span class="metric-icon" :class="{ warning }"><component :is="icon" :size="19" /></span><small>{{ label }}</small><strong>{{ value }}</strong><em :class="{ warning }">{{ note }}</em></div>` }
const SaleRow = { props: ['initials', 'name', 'receipt', 'amount', 'badge'], template: `<div class="customer-row"><div class="avatar">{{ initials }}</div><div class="row-main"><strong>{{ name }}</strong><small>{{ receipt }}</small></div><div class="row-side"><strong>{{ amount }}</strong><small class="status owing">{{ badge }}</small></div></div>` }
const ItemRow = { props: ['name', 'detail', 'count'], template: `<div class="item-row"><div><strong>{{ name }}</strong><small>{{ detail }}</small></div><div class="stepper"><button>−</button><b>{{ count }}</b><button>+</button></div></div>` }
const FormField = { props: ['label', 'placeholder'], template: `<label>{{ label }}<input :placeholder="placeholder" /></label>` }
const ReceiptLine = { props: ['label', 'amount', 'strong'], template: `<div class="receipt-line" :class="{ strong }"><span>{{ label }}</span><strong>{{ amount }}</strong></div>` }
</script>

<template>
  <div class="app-frame">
    <header v-if="isAppScreen" class="desktop-header">
      <div class="brand-lockup"><span class="brand-mark">C</span><span>Duka Manager</span></div>
      <button class="desktop-menu-trigger" @click="toggleMenu"><List :size="19" weight="regular" /> Menu</button>
      <div class="desktop-header-actions"><span class="desktop-user">A</span><button class="desktop-share">Share prototype</button></div>
    </header>

    <main class="stage">
      <section v-if="currentScreen === 'create-account'" class="auth-screen">
        <div class="auth-mark">C</div>
        <h1>Create Account</h1><p>Sign up to start managing your shop</p>
        <label>Full name<input placeholder="e.g. Wanjiku Kamau" /></label>
        <label>Phone number<input placeholder="+254 7XX XXX XXX" /></label>
        <label>Shop name<input placeholder="e.g. Corner Shop" /></label>
        <label class="check-row"><input type="checkbox" /> <span>I accept the Terms and Conditions</span></label>
        <button class="primary-button" @click="navigate('create-pin')">Continue <ArrowRight :size="18" /></button>
        <button class="text-button" @click="navigate('login')">Already have an account? Log in</button>
      </section>

      <section v-else-if="currentScreen === 'create-pin'" class="auth-screen pin-screen">
        <div class="auth-mark">C</div><h1>Create PIN</h1><p>Choose a 4-digit PIN to protect your shop</p>
        <div class="pin-dots"><i class="filled"></i><i class="filled"></i><i></i><i></i></div>
        <div class="keypad"><button v-for="key in [1,2,3,4,5,6,7,8,9,'',0,'⌫']" :key="key">{{ key }}</button></div>
        <button class="primary-button" @click="navigate('login')">Finish setup <Check :size="18" /></button>
      </section>

      <section v-else-if="currentScreen === 'login'" class="auth-screen login-screen">
        <div class="auth-mark">C</div><h1>Welcome back!</h1><p>Log in to your shop</p>
        <label>Phone number<input value="+254 712 345 678" /></label>
        <label>PIN<input value="••••" type="password" /></label>
        <button class="forgot-button">Forgot PIN?</button>
        <button class="primary-button" @click="navigate('dashboard')">Log in <ArrowRight :size="18" /></button>
        <button class="download-button" @click="showToast('APK download link will be connected in the release setup.')"><DownloadSimple :size="18" /> Download Android app</button>
        <button class="text-button" @click="navigate('create-account')">Create a new account</button>
      </section>

      <section v-else-if="currentScreen === 'profile'" class="product-screen">
        <AppHeader title="Menu" subtitle="Manage your shop" :back="false" @menu="toggleMenu" />
        <div class="profile-hero"><div class="avatar avatar-large">WK</div><div><h2>Wanjiku Kamau</h2><p>Owner · Corner Shop</p></div></div>
        <div class="list-card profile-list">
          <ListRow :icon="User" label="Personal details" /><ListRow :icon="Storefront" label="Shop details" /><ListRow :icon="CreditCard" label="Change PIN" /><ListRow :icon="Bell" label="Notifications" /><ListRow :icon="ChartLineUp" label="Account activity" />
        </div><button class="list-card logout-row" @click="navigate('login')"><SignOut :size="21" /> Log out</button>
      </section>

      <section v-else-if="currentScreen === 'dashboard'" class="product-screen dashboard-screen">
        <AppHeader title="Good afternoon, Wanjiku" subtitle="Here’s what’s happening in your shop today" :back="false" home-header @menu="toggleMenu" />
        <div class="sales-hero"><span>Today’s sales</span><strong>{{ mockData.dashboard.todaySales }}</strong><small>{{ mockData.dashboard.yesterdayChange }} · {{ mockData.dashboard.receipts }} receipts</small></div>
        <div class="quick-actions"><QuickAction :icon="UsersThree" label="Customer" @click="navigate('customers')" /><QuickAction :icon="Truck" label="Supplier" @click="navigate('suppliers')" /><QuickAction :icon="Package" label="Stock In" @click="navigate('stock')" /></div>
        <div class="metric-grid"><MetricCard label="M-Pesa payments" :value="mockData.dashboard.mpesaToday" :note="mockData.dashboard.mpesaShare" :icon="DeviceMobile" /><MetricCard label="Debts" :value="mockData.dashboard.debts" :note="`${mockData.dashboard.debtCustomers} customers`" :icon="Warning" warning /></div>
        <div class="finance-summary"><div><span>Outstanding debts</span><strong>{{ mockData.dashboard.debts }}</strong><small>{{ mockData.dashboard.debtCustomers }} customers currently taking credit</small></div><button @click="navigate('customers')">View debts <CaretRight :size="16" /></button></div>
        <div class="analytics-card"><div class="analytics-heading"><div><strong>Sales this week</strong><small>KES 286,450 total</small></div><span>+18.4%</span></div><div class="bar-chart"><div v-for="(height, index) in mockData.dashboard.weeklySales" :key="mockData.dashboard.weeklyLabels[index]" class="bar-column"><div class="bar" :style="{ height: `${height}px` }"></div><small>{{ mockData.dashboard.weeklyLabels[index] }}</small></div></div></div>
        <div class="section-heading"><h3>Top products</h3><button @click="navigate('stock')">View stock</button></div>
        <div class="list-card top-products"><div v-for="product in mockData.dashboard.topProducts" :key="product.name" class="product-row"><div><strong>{{ product.name }}</strong><small>{{ product.units }} units sold</small></div><strong>{{ product.revenue }}</strong></div></div>
        <div class="section-heading"><h3>Recent sales</h3><button @click="navigate('sales')">View all</button></div>
        <div class="list-card"><SaleRow initials="WK" name="Wanjiku Kamau" receipt="#RC-2048 · 4:12 PM" amount="KES 1,850" badge="M-Pesa" /><SaleRow initials="OO" name="Otieno Odhiambo" receipt="#RC-2047 · 3:40 PM" amount="KES 620" badge="Cash" /></div>
      </section>

      <section v-else-if="currentScreen === 'sales'" class="product-screen">
        <PageHeader title="Sales" subtitle="23 receipts today" placeholder="Search receipt or customer..." v-model="search" @menu="toggleMenu" />
        <div class="metric-grid"><MetricCard label="Total today" value="KES 48,650" note="23 receipts" :icon="Receipt" /><MetricCard label="Cash" value="KES 13,450" note="6 payments" :icon="CreditCard" /></div>
        <div class="filter-row"><button class="active">Today</button><button>Week</button><button>Month</button><button>M-Pesa</button><button>Cash</button></div>
        <div class="list-card"><SaleRow v-for="sale in filteredSales" :key="sale.receipt" v-bind="sale" /></div>
      </section>

      <section v-else-if="currentScreen === 'new-sale'" class="product-screen">
        <AppHeader title="New Sale" subtitle="Receipt #RC-2049" @back="navigate('dashboard')" @menu="toggleMenu" />
        <button class="customer-picker"><Users :size="21" /> Walk-in customer <CaretRight :size="18" /></button><div class="section-heading"><h3>Items (3)</h3><button>Add item</button></div>
        <div class="list-card item-list"><ItemRow name="Unga Maize Flour 2kg" detail="KES 150 × 2 = KES 300" count="2" /><ItemRow name="Bidco Cooking Oil 1L" detail="KES 320 × 1 = KES 320" count="1" /><ItemRow name="Brookside Milk 500ml" detail="KES 60 × 3 = KES 180" count="3" /></div>
        <div class="total-card"><span>Subtotal</span><strong>KES 800</strong><span>Total</span><strong>KES 800</strong></div><p class="field-label">Payment method</p><div class="filter-row"><button class="active">M-Pesa</button><button>Cash</button><button>Credit</button></div><button class="primary-button" @click="navigate('payment-received')">Complete sale <Check :size="18" /></button>
      </section>

      <section v-else-if="currentScreen === 'payment-received'" class="auth-screen payment-screen"><div class="success-mark"><Check :size="40" /></div><h1>Payment received</h1><strong class="payment-amount">KES 800</strong><p>M-Pesa · Receipt #RC-2049 · 4:32 PM</p><div class="receipt-card"><ReceiptLine label="Unga Maize Flour 2kg × 2" amount="KES 300" /><ReceiptLine label="Bidco Cooking Oil 1L × 1" amount="KES 320" /><ReceiptLine label="Brookside Milk 500ml × 3" amount="KES 180" /><hr /><ReceiptLine label="Customer" amount="Walk-in customer" /><ReceiptLine label="Total paid" amount="KES 800" strong /></div><button class="primary-button" @click="navigate('dashboard')">Back to dashboard</button></section>

      <section v-else-if="currentScreen === 'customers'" class="product-screen"><PageHeader title="Customers" subtitle="128 customers" placeholder="Search name or phone..." v-model="search" @menu="toggleMenu" /><button class="floating-add" @click="navigate('add-customer')"><Plus :size="24" /></button><div class="filter-row"><button class="active">All</button><button>With credit (23)</button><button>Top buyers</button></div><div class="list-card"><div v-for="row in filteredCustomers" :key="row[1]" class="customer-row"><div class="avatar">{{ row[0] }}</div><div class="row-main"><strong>{{ row[1] }}</strong><small>{{ row[2] }}</small></div><div class="row-side"><strong :class="{ debt: row[4] !== 'Cleared' }">{{ row[3] }}</strong><small :class="statusClass(row[4])">{{ row[4] }}</small></div></div></div></section>

      <section v-else-if="currentScreen === 'add-customer'" class="product-screen"><AppHeader title="Add Customer" subtitle="New customer record" @back="navigate('customers')" @menu="toggleMenu" /><FormField label="Full name" placeholder="e.g. Otieno Odhiambo" /><FormField label="Phone number" placeholder="+254 7XX XXX XXX" /><FormField label="Location" placeholder="e.g. Kilimani" /><div class="toggle-row"><div><strong>Allow credit</strong><small>Customer can pay later</small></div><div class="toggle on"></div></div><button class="primary-button" @click="navigate('customers')">Save customer</button></section>

      <section v-else-if="currentScreen === 'suppliers'" class="product-screen"><PageHeader title="Suppliers" subtitle="14 active suppliers" placeholder="Search supplier or product..." v-model="search" @menu="toggleMenu" /><button class="floating-add" @click="navigate('add-supplier')"><Plus :size="24" /></button><div class="metric-grid"><MetricCard label="Amount owed" value="KES 214,300" note="to 6 suppliers" :icon="Warning" warning /><MetricCard label="Deliveries" value="3 this week" note="next: Mon" :icon="Truck" /></div><div class="filter-row"><button class="active">All</button><button>Owed (6)</button><button>Food & drinks</button></div><div class="list-card"><SaleRow v-for="supplier in mockData.suppliers" :key="supplier.name" v-bind="supplier" /></div></section>

      <section v-else-if="currentScreen === 'add-supplier'" class="product-screen"><AppHeader title="Add Supplier" subtitle="New supplier record" @back="navigate('suppliers')" @menu="toggleMenu" /><FormField label="Supplier name" placeholder="e.g. Unga Group Ltd" /><FormField label="Contact phone" placeholder="+254 7XX XXX XXX" /><FormField label="Products supplied" placeholder="e.g. Maize flour, wheat flour" /><button class="customer-picker">Payment terms <span>Cash on delivery</span><CaretRight :size="18" /></button><button class="primary-button" @click="navigate('suppliers')">Save supplier</button></section>

      <section v-else-if="currentScreen === 'stock'" class="product-screen"><PageHeader title="Stock" subtitle="142 products" placeholder="Search product..." v-model="search" @menu="toggleMenu" /><button class="floating-add"><Plus :size="24" /></button><div class="metric-grid"><MetricCard label="Products" value="142" note="in your shop" :icon="Box" /><MetricCard label="Low stock" value="7 items" note="restock soon" :icon="Warning" warning /></div><div class="filter-row"><button>All</button><button class="active">Low stock (7)</button><button>Out of stock</button></div><div class="list-card"><div v-for="row in filteredStock" :key="row[1]" class="customer-row"><div class="avatar">{{ row[0] }}</div><div class="row-main"><strong>{{ row[1] }}</strong><small>{{ row[2] }}</small></div><div class="row-side"><strong class="debt">{{ row[3] }}</strong><small class="status overdue">{{ row[4] }}</small></div></div></div></section>
    </main>

    <button v-if="currentScreen === 'dashboard'" class="home-fab" aria-label="Record a sale" @click="navigate('new-sale')"><ShoppingCart :size="21" weight="bold" /><span>Record sale</span></button>
    <nav v-if="isAppScreen" class="bottom-nav"><button @click="navigate('dashboard')" :class="{ selected: currentScreen === 'dashboard' }"><House :size="20" />Home</button><button @click="navigate('sales')" :class="{ selected: currentScreen === 'sales' }"><ShoppingCart :size="20" />Sales</button><button @click="navigate('customers')" :class="{ selected: currentScreen === 'customers' }"><UsersThree :size="20" />Customers</button><button @click="navigate('stock')" :class="{ selected: currentScreen === 'stock' }"><Package :size="20" />Stock</button><button @click="navigate('suppliers')" :class="{ selected: currentScreen === 'suppliers' }"><Truck :size="20" />Suppliers</button></nav>
    <div v-if="menuOpen" class="menu-layer" @click.self="closeMenu">
      <aside class="menu-drawer" aria-label="Shop navigation">
        <div class="drawer-heading"><div class="brand-lockup"><span class="brand-mark">C</span><strong>Duka Manager</strong></div><button class="drawer-close" aria-label="Close menu" @click="closeMenu"><Close :size="21" weight="regular" /></button></div>
        <div class="drawer-profile"><div class="avatar">WK</div><div><strong>Wanjiku Kamau</strong><small>Corner Shop</small></div></div>
        <p class="drawer-label">Shop menu</p>
        <button class="drawer-row" @click="navigate('dashboard')"><House :size="20" weight="regular" /><span>Dashboard</span><CaretRight :size="17" /></button>
        <button class="drawer-row" @click="navigate('sales')"><Receipt :size="20" weight="regular" /><span>Sales</span><CaretRight :size="17" /></button>
        <button class="drawer-row" @click="navigate('customers')"><UsersThree :size="20" weight="regular" /><span>Customers</span><CaretRight :size="17" /></button>
        <button class="drawer-row" @click="navigate('suppliers')"><Truck :size="20" weight="regular" /><span>Suppliers</span><CaretRight :size="17" /></button>
        <button class="drawer-row" @click="navigate('stock')"><Package :size="20" weight="regular" /><span>Stock</span><CaretRight :size="17" /></button>
        <div class="drawer-divider"></div>
        <button class="drawer-row" @click="navigate('profile')"><User :size="20" weight="regular" /><span>Profile and settings</span><CaretRight :size="17" /></button>
        <button class="drawer-logout" @click="navigate('login')"><SignOut :size="20" weight="regular" /><span>Log out</span></button>
      </aside>
    </div>
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

