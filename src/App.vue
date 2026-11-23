<script setup>
import { computed, h, ref } from 'vue'
import {
  PhArrowLeft as ArrowLeft,
  PhArrowRight as ArrowRight,
  PhBell as Bell,
  PhCalendarBlank as CalendarBlank,
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
const debtPaymentOpen = ref(false)
const debtPaymentAmount = ref('')
const familyPlanningDate = ref('2026-12-18')
const scheduleVisitOpen = ref(false)
const scheduleDate = ref('2026-12-18')
const customerFilter = ref('all')
const showAllVisits = ref(false)
const openVisitNote = ref(null)

// Local-only fixture data for UI review. This is intentionally static until the API layer is added.
const mockData = {
  shop: { owner: 'Wanjiku Kamau', name: 'Corner Shop', phone: '+254 712 345 678' },
  dashboard: {
    todaySales: 'KES 48,650', yesterdayChange: '+12% vs yesterday', receipts: 23,
    mpesaToday: 'KES 31,200', mpesaShare: '64% of sales', debts: 'KES 86,400', debtCustomers: 23,
    weeklySales: [28, 36, 31, 48, 42, 58, 48],
    weeklyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'],
    topProducts: [
      { name: 'Paracetamol 500mg', units: 96, revenue: 'KES 4,800' },
      { name: 'ORS Sachets', units: 42, revenue: 'KES 2,940' },
      { name: 'Artemether-Lumefantrine 20/120mg', units: 28, revenue: 'KES 6,720' },
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
    ['P5', 'Paracetamol 500mg', 'Price KES 50 · 100 tablets', '4 packs left', 'Low'],
    ['OR', 'ORS Sachets', 'Price KES 70 · 20 sachets', '6 packs left', 'Reorder'],
    ['AL', 'Artemether-Lumefantrine 20/120mg', 'Price KES 240 · 6 tablets', '2 packs left', 'Low'],
    ['AM', 'Amoxicillin 500mg', 'Price KES 180 · 21 capsules', '0 packs left', 'Out'],
    ['DP', 'Depo-Provera Injection', 'Price KES 450 · 1 dose', '9 doses left', 'Healthy'],
  ],
}

const selectedCustomer = ref({ initials: 'OO', name: 'Otieno Odhiambo', contact: '0722 910 442 · Kilimani', balance: 'KES 4,200', status: 'Owing', familyPlanning: true, nextReminder: '18 Dec 2026', visits: [{ date: '22 Oct 2026', label: 'Visit 1', status: 'Completed', notes: 'Started monthly treatment. Client requested afternoon reminders.' }, { date: '20 Nov 2026', label: 'Visit 2', status: 'Completed', notes: 'Client arrived 2 days late and was taking antibiotics. Pharmacist advised follow-up before treatment.' }, { date: '18 Dec 2026', label: 'Upcoming', status: 'Scheduled', notes: '' }, { date: '20 Sep 2026', label: 'Visit 0', status: 'Completed', notes: 'Initial family planning counselling and treatment collection.' }, { date: '20 Aug 2026', label: 'Visit 0', status: 'Completed', notes: 'Client enrolled in the family planning reminder programme.' }] })
const supplierPaymentOpen = ref(false)
const supplierPaymentAmount = ref('')
const selectedSupplier = ref({ initials: 'UG', name: 'Unga Group Ltd', contact: 'Maize and wheat flour supplier', balance: 'KES 62,000', status: 'Owed', supplies: [{ date: '08 Dec 2026', description: 'Pharmacy stock delivery', total: 'KES 84,000' }, { date: '25 Nov 2026', description: 'Flour and wellness products', total: 'KES 36,500' }], payments: [{ date: '10 Dec 2026', method: 'M-Pesa', amount: 'KES 22,000' }, { date: '02 Dec 2026', method: 'Bank transfer', amount: 'KES 15,000' }] })

const screens = [
  'create-account', 'create-pin', 'login', 'profile', 'dashboard', 'sales',
  'new-sale', 'payment-received', 'customers', 'customer-detail', 'add-customer', 'suppliers',
  'add-supplier', 'supplier-detail', 'stock', 'add-stock',
]

const screenIndex = computed(() => screens.indexOf(currentScreen.value))
const isAppScreen = computed(() => screenIndex.value >= 3)

const navigate = (screen) => {
  currentScreen.value = screen
  search.value = ''
  menuOpen.value = false
  if (screen !== 'customer-detail') debtPaymentOpen.value = false
  if (screen !== 'supplier-detail') supplierPaymentOpen.value = false
  window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
}

const openCustomer = (row) => {
  selectedCustomer.value = { initials: row[0], name: row[1], contact: row[2], balance: row[3], status: row[4], familyPlanning: isFamilyPlanning(row), nextReminder: '18 Dec 2026', visits: selectedCustomer.value.visits }
  showAllVisits.value = false
  openVisitNote.value = null
  scheduleDate.value = '2026-12-18'
  navigate('customer-detail')
}

const openSupplier = (supplier) => {
  selectedSupplier.value = { ...selectedSupplier.value, initials: supplier.initials, name: supplier.name, contact: supplier.receipt, balance: supplier.amount, status: supplier.badge }
  navigate('supplier-detail')
}

const recordSupplierPayment = () => {
  if (!supplierPaymentAmount.value) return
  selectedSupplier.value.balance = 'KES 47,000'
  selectedSupplier.value.status = 'Owed'
  supplierPaymentAmount.value = ''
  supplierPaymentOpen.value = false
  showToast('Supplier payment recorded and balance updated')
}

const isFamilyPlanning = (row) => ['Otieno Odhiambo', 'Aisha Mohamed'].includes(row[1])
const setCustomerFilter = (filter) => { customerFilter.value = filter }
const toggleVisitNote = (index) => { openVisitNote.value = openVisitNote.value === index ? null : index }
const formatDate = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not scheduled'
const scheduleFamilyPlanningVisit = () => {
  if (!scheduleDate.value) return
  selectedCustomer.value.nextReminder = formatDate(scheduleDate.value)
  selectedCustomer.value.visits = [...selectedCustomer.value.visits.filter((visit) => visit.status !== 'Scheduled'), { date: formatDate(scheduleDate.value), label: 'Upcoming', status: 'Scheduled', notes: '' }]
  scheduleVisitOpen.value = false
  showToast('Family planning date scheduled')
}

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const showToast = (message) => {
  toast.value = message
  window.clearTimeout(showToast.timer)
  showToast.timer = window.setTimeout(() => { toast.value = '' }, 2400)
}

const recordDebtPayment = () => {
  if (!debtPaymentAmount.value) return
  selectedCustomer.value.balance = 'KES 2,700'
  selectedCustomer.value.status = 'Owing'
  debtPaymentAmount.value = ''
  debtPaymentOpen.value = false
  showToast('Debt payment recorded and balance updated')
}

const filteredCustomers = computed(() => {
  return mockData.customers.filter((row) => row.join(' ').toLowerCase().includes(search.value.toLowerCase())).filter((row) => customerFilter.value === 'all' || isFamilyPlanning(row))
})

const filteredStock = computed(() => {
  return mockData.stock.filter((row) => row.join(' ').toLowerCase().includes(search.value.toLowerCase()))
})

const filteredSales = computed(() => mockData.sales.filter((row) => Object.values(row).join(' ').toLowerCase().includes(search.value.toLowerCase())))
const visibleVisits = computed(() => {
  const visits = [...selectedCustomer.value.visits].sort((a, b) => new Date(a.date) - new Date(b.date))
  return showAllVisits.value ? visits : visits.slice(-3)
})

const statusClass = (status) => status === 'Cleared' ? 'status cleared' : status === 'Overdue' ? 'status overdue' : 'status owing'
const icon = (component, props = {}) => h(component, { size: 20, ...props })
const AppHeader = { props: ['title', 'subtitle', 'back', 'homeHeader'], emits: ['back', 'menu'], setup(props, { emit }) { return () => h('div', { class: ['page-header', { 'home-header': props.homeHeader }] }, [props.back !== false ? h('button', { class: 'back-button', onClick: () => emit('back') }, [icon(ArrowLeft)]) : null, h('div', [h('h1', props.title), h('p', props.subtitle)]), h('button', { class: 'page-menu-trigger', 'aria-label': 'Open menu', onClick: () => emit('menu') }, [icon(List, { size: 21 })])]) } }
const PageHeader = { props: ['title', 'subtitle', 'placeholder', 'modelValue'], emits: ['update:modelValue', 'menu'], setup(props, { emit }) { return () => h('div', { class: 'page-header' }, [h('div', [h('h1', props.title), h('p', props.subtitle)]), h('button', { class: 'page-menu-trigger', 'aria-label': 'Open menu', onClick: () => emit('menu') }, [icon(List, { size: 21 })]), h('div', { class: 'search-field' }, [icon(MagnifyingGlass, { size: 19 }), h('input', { placeholder: props.placeholder, value: props.modelValue, onInput: event => emit('update:modelValue', event.target.value) })])]) } }
const ListRow = { props: ['icon', 'label'], setup(props) { return () => h('button', { class: 'list-row' }, [icon(props.icon, { size: 21 }), h('span', props.label), icon(CaretRight, { size: 18 })]) } }
const QuickAction = { props: ['icon', 'label'], setup(props, { emit }) { return () => h('button', { class: 'quick-action', onClick: () => emit('click') }, [h('span', [icon(props.icon, { size: 22 })]), h('small', props.label)]) } }
const MetricCard = { props: ['label', 'value', 'note', 'icon', 'warning'], setup(props) { return () => h('div', { class: 'metric-card' }, [h('span', { class: ['metric-icon', { warning: props.warning }] }, [icon(props.icon, { size: 19 })]), h('small', props.label), h('strong', props.value), h('em', { class: { warning: props.warning } }, props.note)]) } }
const SaleRow = { props: ['initials', 'name', 'receipt', 'amount', 'badge'], setup(props) { return () => h('div', { class: 'customer-row' }, [h('div', { class: 'avatar' }, props.initials), h('div', { class: 'row-main' }, [h('strong', props.name), h('small', props.receipt)]), h('div', { class: 'row-side' }, [h('strong', props.amount), h('small', { class: 'status owing' }, props.badge)])]) } }
const ItemRow = { props: ['name', 'detail', 'count'], setup(props) { return () => h('div', { class: 'item-row' }, [h('div', [h('strong', props.name), h('small', props.detail)]), h('div', { class: 'stepper' }, [h('button', '−'), h('b', props.count), h('button', '+')])]) } }
const FormField = { props: ['label', 'placeholder'], setup(props) { return () => h('label', [props.label, h('input', { placeholder: props.placeholder })]) } }
const ReceiptLine = { props: ['label', 'amount', 'strong'], setup(props) { return () => h('div', { class: ['receipt-line', { strong: props.strong }] }, [h('span', props.label), h('strong', props.amount)]) } }
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
        <div class="list-card item-list"><ItemRow name="Paracetamol 500mg" detail="KES 50 × 2 = KES 100" count="2" /><ItemRow name="ORS Sachets" detail="KES 70 × 1 = KES 70" count="1" /><ItemRow name="Vitamin C 500mg" detail="KES 105 × 6 = KES 630" count="6" /></div>
        <div class="total-card"><span>Subtotal</span><strong>KES 800</strong><span>Total</span><strong>KES 800</strong></div><p class="field-label">Payment method</p><div class="filter-row"><button class="active">M-Pesa</button><button>Cash</button><button>Credit</button></div><button class="primary-button" @click="navigate('payment-received')">Complete sale <Check :size="18" /></button>
      </section>

      <section v-else-if="currentScreen === 'payment-received'" class="auth-screen payment-screen"><div class="success-mark"><Check :size="40" /></div><h1>Payment received</h1><strong class="payment-amount">KES 800</strong><p>M-Pesa · Receipt #RC-2049 · 4:32 PM</p><div class="receipt-card"><ReceiptLine label="Paracetamol 500mg × 2" amount="KES 100" /><ReceiptLine label="ORS Sachets × 1" amount="KES 70" /><ReceiptLine label="Vitamin C 500mg × 6" amount="KES 630" /><hr /><ReceiptLine label="Customer" amount="Walk-in customer" /><ReceiptLine label="Total paid" amount="KES 800" strong /></div><button class="primary-button" @click="navigate('dashboard')">Back to dashboard</button></section>

      <section v-else-if="currentScreen === 'customers'" class="product-screen"><PageHeader title="Customers" subtitle="128 customers" placeholder="Search name or phone..." v-model="search" @menu="toggleMenu" /><div class="filter-row"><button :class="{ active: customerFilter === 'all' }" @click="setCustomerFilter('all')">All</button><button :class="{ active: customerFilter === 'family-planning' }" @click="setCustomerFilter('family-planning')">Family planning (12)</button><button>With credit (23)</button><button>Top buyers</button></div><div class="list-card"><button v-for="row in filteredCustomers" :key="row[1]" class="customer-row customer-button" @click="openCustomer(row)"><div class="avatar">{{ row[0] }}</div><div class="row-main"><strong>{{ row[1] }}</strong><small>{{ row[2] }}</small><small v-if="isFamilyPlanning(row)" class="reminder-label">Family planning client</small></div><div class="row-side"><strong :class="{ debt: row[4] !== 'Cleared' }">{{ row[3] }}</strong><small :class="statusClass(row[4])">{{ row[4] }}</small></div><CaretRight :size="17" /></button></div></section>

      <section v-else-if="currentScreen === 'customer-detail'" class="product-screen"><AppHeader :title="selectedCustomer.name" :subtitle="selectedCustomer.contact" @back="navigate('customers')" @menu="toggleMenu" /><div class="customer-detail-hero"><div class="avatar avatar-large">{{ selectedCustomer.initials }}</div><div><span>Current debt balance</span><strong>{{ selectedCustomer.balance }}</strong><small>{{ selectedCustomer.status }}</small></div></div><div class="detail-actions"><button class="primary-button" @click="debtPaymentOpen = !debtPaymentOpen"><CreditCard :size="18" /> Record debt payment</button></div><div v-if="debtPaymentOpen" class="payment-entry list-card"><label>Payment amount<input v-model="debtPaymentAmount" placeholder="e.g. KES 1,500" /></label><button class="primary-button" @click="recordDebtPayment">Update balance</button></div><div v-if="selectedCustomer.familyPlanning" class="reminder-card"><div><strong>Family planning client</strong><small>Next appointment: {{ selectedCustomer.nextReminder }}</small></div><span class="status cleared">Reminders on</span></div><div v-if="selectedCustomer.familyPlanning" class="visit-card"><div class="section-heading"><h3>Family planning visits</h3><button @click="scheduleVisitOpen = !scheduleVisitOpen"><CalendarBlank :size="16" /> Schedule new date</button></div><div v-if="scheduleVisitOpen" class="schedule-entry"><label>Next visit date<input v-model="scheduleDate" type="date" /></label><button class="primary-button" @click="scheduleFamilyPlanningVisit">Save date</button></div><div class="visit-list"> <div v-for="(visit, index) in visibleVisits" :key="`${visit.date}-${index}`" class="visit-row"><span class="visit-number">{{ index + 1 }}</span><div class="visit-main"><strong>{{ visit.label }}</strong><small>{{ visit.date }} · {{ visit.status }}</small><button v-if="visit.notes" class="notes-button" @click="toggleVisitNote(index)">Read notes</button><p v-if="visit.notes && openVisitNote === index" class="visit-note">{{ visit.notes }}</p></div></div></div><button v-if="selectedCustomer.visits.length > 3" class="show-more-button" @click="showAllVisits = !showAllVisits">{{ showAllVisits ? 'Show fewer visits' : `Show all ${selectedCustomer.visits.length} visits` }}</button></div><div class="section-heading"><h3>Debt history</h3><span class="muted-caption">Balance updates automatically</span></div><div class="list-card ledger-list"><div class="ledger-row"><div><strong>Debt payment</strong><small>06 Dec 2026 · M-Pesa</small></div><strong class="credit-paid">− KES 1,000</strong></div><div class="ledger-row"><div><strong>Credit sale</strong><small>02 Dec 2026 · Receipt #RC-2038</small></div><strong class="debt">+ KES 5,200</strong></div><div class="ledger-row"><div><strong>Debt payment</strong><small>28 Nov 2026 · Cash</small></div><strong class="credit-paid">− KES 2,000</strong></div></div></section>

      <section v-else-if="currentScreen === 'add-customer'" class="product-screen"><AppHeader title="Add Customer" subtitle="New customer record" @back="navigate('customers')" @menu="toggleMenu" /><FormField label="Full name" placeholder="e.g. Otieno Odhiambo" /><FormField label="Phone number" placeholder="+254 7XX XXX XXX" /><FormField label="Location" placeholder="e.g. Kilimani" /><label class="check-row"><input type="checkbox" checked /> <span>Credit customer</span></label><label class="check-row"><input type="checkbox" /> <span>Family planning client</span></label><label class="date-field">Next family planning date<input v-model="familyPlanningDate" type="date" /></label><div class="toggle-row"><div><strong>SMS reminders</strong><small>Send treatment date reminders with consent</small></div><div class="toggle on"></div></div><button class="primary-button" @click="navigate('customers')">Save customer</button></section>

      <section v-else-if="currentScreen === 'suppliers'" class="product-screen"><PageHeader title="Suppliers" subtitle="14 active suppliers" placeholder="Search supplier or product..." v-model="search" @menu="toggleMenu" /><div class="metric-grid"><MetricCard label="Amount owed" value="KES 214,300" note="to 6 suppliers" :icon="Warning" warning /><MetricCard label="Deliveries" value="3 this week" note="next: Mon" :icon="Truck" /></div><div class="filter-row"><button class="active">All</button><button>Owed (6)</button><button>Pharmacy products</button></div><div class="list-card"><SaleRow v-for="supplier in mockData.suppliers" :key="supplier.name" v-bind="supplier" @click="openSupplier(supplier)" /></div></section>

      <section v-else-if="currentScreen === 'supplier-detail'" class="product-screen"><AppHeader :title="selectedSupplier.name" :subtitle="selectedSupplier.contact" @back="navigate('suppliers')" @menu="toggleMenu" /><div class="customer-detail-hero supplier-detail-hero"><div class="avatar avatar-large">{{ selectedSupplier.initials }}</div><div><span>Supplier balance owed</span><strong>{{ selectedSupplier.balance }}</strong><small>{{ selectedSupplier.status }}</small></div></div><div class="detail-actions supplier-actions"><button class="primary-button" @click="supplierPaymentOpen = !supplierPaymentOpen"><CreditCard :size="18" /> Record supplier payment</button></div><div v-if="supplierPaymentOpen" class="payment-entry list-card"><label>Payment amount<input v-model="supplierPaymentAmount" placeholder="e.g. KES 10,000" /></label><button class="primary-button" @click="recordSupplierPayment">Update supplier balance</button></div><div class="section-heading"><h3>Supply history</h3><button>Record supply</button></div><div class="list-card ledger-list"><div v-for="supply in selectedSupplier.supplies" :key="supply.date" class="ledger-row"><div><strong>{{ supply.description }}</strong><small>{{ supply.date }}</small></div><strong class="debt">{{ supply.total }}</strong></div></div><div class="section-heading"><h3>Payment history</h3><span class="muted-caption">Partial payments retained</span></div><div class="list-card ledger-list"><div v-for="payment in selectedSupplier.payments" :key="payment.date" class="ledger-row"><div><strong>Supplier payment</strong><small>{{ payment.date }} · {{ payment.method }}</small></div><strong class="credit-paid">− {{ payment.amount }}</strong></div></div></section>

      <section v-else-if="currentScreen === 'add-supplier'" class="product-screen"><AppHeader title="Add Supplier" subtitle="New supplier record" @back="navigate('suppliers')" @menu="toggleMenu" /><FormField label="Supplier name" placeholder="e.g. Unga Group Ltd" /><FormField label="Contact phone" placeholder="+254 7XX XXX XXX" /><FormField label="Products supplied" placeholder="e.g. Maize flour, wheat flour" /><button class="customer-picker">Payment terms <span>Cash on delivery</span><CaretRight :size="18" /></button><button class="primary-button" @click="navigate('suppliers')">Save supplier</button></section>

      <section v-else-if="currentScreen === 'stock'" class="product-screen"><PageHeader title="Stock" subtitle="142 products" placeholder="Search product..." v-model="search" @menu="toggleMenu" /><div class="metric-grid"><MetricCard label="Products" value="142" note="in your shop" :icon="Box" /><MetricCard label="Low stock" value="7 items" note="restock soon" :icon="Warning" warning /></div><div class="filter-row"><button>All</button><button class="active">Low stock (7)</button><button>Out of stock</button></div><div class="list-card"><div v-for="row in filteredStock" :key="row[1]" class="customer-row"><div class="avatar">{{ row[0] }}</div><div class="row-main"><strong>{{ row[1] }}</strong><small>{{ row[2] }}</small></div><div class="row-side"><strong class="debt">{{ row[3] }}</strong><small class="status overdue">{{ row[4] }}</small></div></div></div></section>
      <section v-else-if="currentScreen === 'add-stock'" class="product-screen"><AppHeader title="Stock In" subtitle="Record incoming stock" @back="navigate('stock')" @menu="toggleMenu" /><FormField label="Product name" placeholder="e.g. Paracetamol 500mg" /><FormField label="Quantity received" placeholder="e.g. 24 packs" /><FormField label="Cost per pack" placeholder="e.g. KES 35" /><button class="customer-picker">Supplier <span>Mediplus Pharmacy Wholesalers</span><CaretRight :size="18" /></button><button class="primary-button" @click="navigate('stock')">Save stock entry</button></section>
    </main>

    <button v-if="currentScreen === 'dashboard'" class="home-fab" aria-label="Record a sale" @click="navigate('new-sale')"><ShoppingCart :size="21" weight="bold" /><span>Record sale</span></button>
    <button v-if="currentScreen === 'customers'" class="home-fab customer-fab" aria-label="Add customer" @click="navigate('add-customer')"><Plus :size="21" weight="bold" /><span>Add customer</span></button>
    <button v-if="currentScreen === 'suppliers'" class="home-fab" aria-label="Add supplier" @click="navigate('add-supplier')"><Plus :size="21" weight="bold" /><span>Add supplier</span></button>
    <button v-if="currentScreen === 'stock'" class="home-fab" aria-label="Record stock in" @click="navigate('add-stock')"><Plus :size="21" weight="bold" /><span>Stock in</span></button>
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

