const roleDefinitions = {
  'satis-operasyon': {
    name: 'Satış Operasyon',
    permissions: { addOrder: true, manageRoles: false }
  },
  'ambar-sorumlusu': {
    name: 'Ambar Sorumlusu',
    permissions: { addOrder: false, manageRoles: false }
  },
  yonetici: {
    name: 'Yönetici',
    permissions: { addOrder: false, manageRoles: true }
  }
};

const stageStatuses = ['Bekliyor', 'Hazırlanıyor', 'Yolda', 'Tamamlandı'];

const provinceOptions = [
  'Adana',
  'Adıyaman',
  'Afyonkarahisar',
  'Ağrı',
  'Aksaray',
  'Amasya',
  'Ankara',
  'Antalya',
  'Ardahan',
  'Artvin',
  'Aydın',
  'Balıkesir',
  'Bartın',
  'Batman',
  'Bayburt',
  'Bilecik',
  'Bingöl',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Bursa',
  'Çanakkale',
  'Çankırı',
  'Çorum',
  'Denizli',
  'Diyarbakır',
  'Düzce',
  'Edirne',
  'Elazığ',
  'Erzincan',
  'Erzurum',
  'Eskişehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkâri',
  'Hatay',
  'Iğdır',
  'Isparta',
  'İstanbul',
  'İzmir',
  'Kahramanmaraş',
  'Karabük',
  'Karaman',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Kırıkkale',
  'Kırklareli',
  'Kırşehir',
  'Kilis',
  'Kocaeli',
  'Konya',
  'Kütahya',
  'Malatya',
  'Manisa',
  'Mardin',
  'Mersin',
  'Muğla',
  'Muş',
  'Nevşehir',
  'Niğde',
  'Ordu',
  'Osmaniye',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Şanlıurfa',
  'Şırnak',
  'Tekirdağ',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Uşak',
  'Van',
  'Yalova',
  'Yozgat',
  'Zonguldak'
];

const factories = [
  {
    id: 'istanbul-sirin',
    name: 'İstanbul Şirin Fabrika',
    city: 'İstanbul',
    manager: 'Gökhan Demir',
    productGroups: ['Metal Ürünler', 'PPRC Boru', 'Metal İçeren Ek Parçalar']
  },
  {
    id: 'sakarya',
    name: 'Sakarya Fabrika',
    city: 'Sakarya',
    manager: 'Nazlı Yıldız',
    productGroups: ['PVC Boru', 'PVC Ek Parçaları']
  },
  {
    id: 'denizli',
    name: 'Denizli Fabrika',
    city: 'Denizli',
    manager: 'Mert Aksoy',
    productGroups: ['Radyatör', 'Flex Ürünler']
  },
  {
    id: 'aksaray-merkez',
    name: 'Aksaray Merkez Fabrika',
    city: 'Aksaray',
    manager: 'Elif Erdem',
    productGroups: ['Sessiz Boru', 'PERT PEX Borular', 'PPRC Borular', 'PVC Borular']
  },
  {
    id: 'aksaray-altyapi',
    name: 'Aksaray Altyapı Fabrika',
    city: 'Aksaray',
    manager: 'Hakan Sezer',
    productGroups: ['Koruge', 'PE100 Hatları']
  }
];

const users = [
  { id: 'user-1', name: 'Ayşe Kurt', roleId: 'satis-operasyon', warehouse: 'İstanbul Şirin Fabrika' },
  { id: 'user-2', name: 'Burak Aslan', roleId: 'ambar-sorumlusu', warehouse: 'Aksaray Merkez Fabrika' },
  { id: 'user-3', name: 'Derya Çetin', roleId: 'yonetici', warehouse: 'Aksaray Merkez Fabrika' }
];

const state = {
  factories,
  users,
  activeUserId: users[0].id,
  orders: [
    {
      id: 'ORD-235664',
      revisionOf: 'ORD-235664',
      orderDate: '01.12.2024 11:40',
      invoiceNumber: '235664',
      type: 'Şantiye',
      routeType: 'Birleştirme',
      accountName: 'Mec Tesisat',
      currentLocation: 'İstanbul Şirin Fabrika',
      nextLocation: 'Aksaray Merkez Fabrika',
      estimatedDelivery: '15.12.2024',
      lastUpdate: '09.11.2024 14:40',
      finalDestination: 'Hatay Çekmece Konut Projesi Şantiyesi',
      routeMap: {
        start: { province: 'İstanbul', position: { x: 22, y: 32 } },
        consolidation: { province: 'Aksaray', position: { x: 56, y: 58 } },
        final: { province: 'Hatay', position: { x: 80, y: 82 } }
      },
      consolidationPoint: 'Aksaray Merkez Fabrika',
      statusHistory: [
        { timestamp: '09.11.2024 10:15', note: 'İstanbul Şirin: Metal ürünler üretimden çıktı.' },
        { timestamp: '09.11.2024 14:40', note: 'Metal hat sevkiyatı İstanbul Şirin fabrikadan yola çıktı.' }
      ],
      products: [
        { code: '332E-M-800150', name: 'Metal Kelepçe Seti', qty: 200, origin: 'İstanbul Şirin Fabrika' },
        { code: '332E-S-900480', name: 'Sessiz Boru DN100', qty: 120, origin: 'Aksaray Merkez Fabrika' }
      ],
      stages: [
        {
          id: 'ORD-235664-1',
          from: 'İstanbul Şirin Fabrika',
          to: 'Aksaray Merkez Fabrika',
          plannedStart: '09.11.2024',
          plannedArrival: '11.11.2024',
          transport: 'İç Transfer Tır',
          note: 'Metal ürünler Aksaray Merkezde sessiz borularla birleştirilecek.',
          responsible: 'İstanbul Şirin Lojistik',
          progress: 2,
          status: 'Yolda',
          completed: false
        },
        {
          id: 'ORD-235664-2',
          from: 'Aksaray Merkez Fabrika',
          to: 'Hatay Çekmece Konut Projesi Şantiyesi',
          plannedStart: '12.11.2024',
          plannedArrival: '15.11.2024',
          transport: 'Tır',
          note: 'Sessiz boru hattı ile konsolidasyon yapılacak.',
          responsible: 'Aksaray Merkez Lojistik',
          progress: 0,
          status: 'Bekliyor',
          completed: false
        }
      ]
    },
    {
      id: 'ORD-336744',
      revisionOf: 'ORD-336744',
      orderDate: '05.12.2024 09:20',
      invoiceNumber: '336744',
      type: 'Bölge',
      routeType: 'Direkt',
      accountName: 'Ankara Bölge Müdürlüğü',
      currentLocation: 'Aksaray Merkez Fabrika',
      nextLocation: 'Ankara Bölge Müdürlüğü Deposu',
      estimatedDelivery: '18.12.2024',
      lastUpdate: '05.12.2024 09:45',
      finalDestination: 'Ankara Bölge Müdürlüğü Deposu',
      routeMap: {
        start: { province: 'Aksaray', position: { x: 57, y: 56 } },
        final: { province: 'Ankara', position: { x: 48, y: 44 } }
      },
      statusHistory: [
        { timestamp: '05.12.2024 08:40', note: 'Aksaray Merkez: PPRC borular sevkiyat planına alındı.' },
        { timestamp: '05.12.2024 09:45', note: 'Çıkış hazırlıkları tamamlanıyor.' }
      ],
      products: [
        { code: 'PPRC-PP-110', name: 'PPRC Boru 110mm', qty: 300, origin: 'Aksaray Merkez Fabrika' },
        { code: 'PPRC-FF-90', name: 'PPRC Fitting Seti', qty: 480, origin: 'Aksaray Merkez Fabrika' }
      ],
      stages: [
        {
          id: 'ORD-336744-1',
          from: 'Aksaray Merkez Fabrika',
          to: 'Ankara Bölge Müdürlüğü Deposu',
          plannedStart: '06.12.2024',
          plannedArrival: '08.12.2024',
          transport: 'Kamyon',
          note: 'Bölge stok yenileme sevkiyatı.',
          responsible: 'Aksaray Merkez Sevkiyat',
          progress: 1,
          status: 'Hazırlanıyor',
          completed: false
        }
      ]
    },
    {
      id: 'ORD-363723',
      revisionOf: 'ORD-363723',
      orderDate: '09.11.2024 12:10',
      invoiceNumber: '363723',
      type: 'Müşteri Depo',
      routeType: 'Direkt',
      accountName: 'Malatya Malzeme Deposu',
      currentLocation: 'İstanbul Şirin Fabrika',
      nextLocation: 'Malatya Bölge Deposu',
      estimatedDelivery: '20.11.2024',
      lastUpdate: '09.11.2024 12:35',
      finalDestination: 'Malatya Bölge Deposu',
      routeMap: {
        start: { province: 'İstanbul', position: { x: 22, y: 32 } },
        final: { province: 'Malatya', position: { x: 72, y: 60 } }
      },
      statusHistory: [
        { timestamp: '09.11.2024 12:10', note: 'İstanbul Şirin: Metal raf sistemleri paketlendi.' }
      ],
      products: [
        { code: 'METAL-KONSTR-45', name: 'Metal Raf Profili', qty: 150, origin: 'İstanbul Şirin Fabrika' },
        { code: 'PVC-SK-50', name: 'PVC Ek Parça Seti', qty: 200, origin: 'Sakarya Fabrika' }
      ],
      stages: [
        {
          id: 'ORD-363723-1',
          from: 'İstanbul Şirin Fabrika',
          to: 'Malatya Bölge Deposu',
          plannedStart: '10.11.2024',
          plannedArrival: '17.11.2024',
          transport: 'Tır',
          note: 'Metal ürün sevkiyatı.',
          responsible: 'İstanbul Şirin Lojistik',
          progress: 0,
          status: 'Bekliyor',
          completed: false
        },
        {
          id: 'ORD-363723-2',
          from: 'Sakarya Fabrika',
          to: 'Malatya Bölge Deposu',
          plannedStart: '11.11.2024',
          plannedArrival: '17.11.2024',
          transport: 'Tır',
          note: 'PVC boru ve ek parçalar sevkiyatı.',
          responsible: 'Sakarya Sevkiyat',
          progress: 1,
          status: 'Hazırlanıyor',
          completed: false
        }
      ]
    }
  ],
  archivedOrders: [
    {
      id: 'ORD-IZM-225987',
      orderDate: '12.08.2024 11:00',
      invoiceNumber: '225987',
      type: 'Şantiye',
      routeType: 'Direkt',
      accountName: 'İzmir Stadyum Projesi',
      deliveredAt: '18.08.2024 17:40',
      finalDestination: 'İzmir Stadyum Projesi Şantiyesi'
    },
    {
      id: 'ORD-BRS-248991',
      orderDate: '22.09.2024 15:20',
      invoiceNumber: '248991',
      type: 'Müşteri Depo',
      routeType: 'Bölge',
      accountName: 'Bursa Bölge Deposu',
      deliveredAt: '26.09.2024 09:10',
      finalDestination: 'Bursa Bölge Deposu'
    }
  ],
  productCatalog: [
    { code: 'MET-001', name: 'Galvaniz Dirsek', factoryId: 'istanbul-sirin', groups: ['Metal Ürünler'] },
    { code: 'PPR-110', name: 'PPRC Boru 110mm', factoryId: 'aksaray-merkez', groups: ['PPRC Borular'] },
    { code: 'PVC-063', name: 'PVC Boru 63mm', factoryId: 'sakarya', groups: ['PVC Borular'] },
    { code: 'RAD-500', name: 'Panel Radyatör 500/1000', factoryId: 'denizli', groups: ['Radyatör'] },
    { code: 'FLEX-PEX', name: 'Flex Hortum Seti', factoryId: 'denizli', groups: ['Flex Ürünler'] },
    { code: 'SESSIZ-100', name: 'Sessiz Boru DN100', factoryId: 'aksaray-merkez', groups: ['Sessiz Boru'] },
    { code: 'KRG-400', name: 'Koruge Boru 400mm', factoryId: 'aksaray-altyapi', groups: ['Koruge'] },
    { code: 'PE100-225', name: 'PE100 Basınçlı Hat 225mm', factoryId: 'aksaray-altyapi', groups: ['PE100 Hatları'] }
  ],
  activeTab: 'siparisler',
  activeOrderId: null,
  activeWarehouse: users[0].warehouse,
  warehouseReceipts: {},
  modalType: null
};

const modalState = {
  type: null
};

document.addEventListener('DOMContentLoaded', () => {
  initialiseOrders();
  bindNavigation();
  bindGlobalActions();
  setupWarehouseSelect();
  setupUserControls();
  state.activeOrderId = state.orders[0]?.id ?? null;
  renderAll();
});

function initialiseOrders() {
  state.warehouseReceipts = {};
  state.orders.forEach((order) => {
    prepareStageData(order);
    order.stages.forEach((stage) => {
      stage.status = stageStatuses[stage.progress] ?? stage.status;
      stage.completed = stage.progress >= stageStatuses.length - 1;
      updateWarehouseReceipts(order, stage, order.lastUpdate);
    });
    updateOrderFlow(order);
  });
}

function prepareStageData(order) {
  if (!order) {
    return;
  }

  if (order.routeType === 'Birleştirme') {
    if (!order.consolidationPoint) {
      const firstStage = order.stages[0];
      const secondStage = order.stages[1];
      if (secondStage && firstStage?.to === secondStage.from) {
        order.consolidationPoint = secondStage.from;
      } else if (firstStage?.to) {
        order.consolidationPoint = firstStage.to;
      }
    }
  }

  order.stages.forEach((stage, index) => {
    stage.lineItems = normaliseLineItems(order, stage, index);
    stage.dispatchApproval = stage.dispatchApproval || {
      approved: false,
      approvedBy: null,
      timestamp: null,
      note: ''
    };
  });
}

function normaliseLineItems(order, stage, stageIndex) {
  const targetProducts = deriveProductsForStage(order, stage, stageIndex);
  const existing = Array.isArray(stage.lineItems) ? stage.lineItems : [];

  return targetProducts.map((product) => {
    const matched = existing.find((item) => item.productCode === product.code);
    const qty = Number(product.qty) || 0;
    const defaultLocal = isProductManagedByStage(stage, product);
    const isLocal = matched?.isLocal ?? defaultLocal;
    const baseReady = clamp(matched?.readyQty ?? qty - (matched?.missingQty ?? 0), 0, qty);
    const baseMissing = clamp(matched?.missingQty ?? qty - baseReady, 0, qty);

    const readyQty = isLocal ? baseReady : qty;
    const missingQty = isLocal ? baseMissing : 0;

    return {
      productCode: product.code,
      productName: product.name,
      origin: product.origin,
      qty,
      readyQty,
      missingQty,
      isLocal
    };
  });
}

function deriveProductsForStage(order, stage, stageIndex) {
  if (!order || !stage) {
    return [];
  }

  const consolidationPoint = order.consolidationPoint;
  const isConsolidationDispatch = Boolean(
    consolidationPoint && stage.from === consolidationPoint && stageIndex > 0
  );

  let products = order.products.filter((product) => product.origin === stage.from);

  if (isConsolidationDispatch) {
    products = order.products.slice();
  }

  if (products.length === 0) {
    if (order.stages.length === 1) {
      products = order.products.slice();
    } else if (isConsolidationDispatch) {
      products = order.products.slice();
    }
  }

  if (products.length === 0) {
    products = order.products.slice();
  }

  return products;
}

function normalizeLocationName(name) {
  return (name ?? '')
    .toString()
    .trim()
    .toLocaleLowerCase('tr-TR');
}

function isSameLocationName(a, b) {
  const normalizedA = normalizeLocationName(a);
  const normalizedB = normalizeLocationName(b);
  if (!normalizedA || !normalizedB) {
    return false;
  }
  return normalizedA === normalizedB;
}

function isProductManagedByStage(stage, product) {
  if (!stage || !product) {
    return true;
  }
  const stageOrigin = normalizeLocationName(stage.from);
  if (!stageOrigin) {
    return true;
  }
  const productOrigin = normalizeLocationName(product.origin);
  if (!productOrigin) {
    return true;
  }
  return stageOrigin === productOrigin;
}

function getActiveRoleId() {
  return getActiveUser()?.roleId ?? null;
}

function isManagerUser() {
  return getActiveRoleId() === 'yonetici';
}

function canManageOutgoingStage(stage) {
  if (!stage) {
    return false;
  }
  if (isManagerUser()) {
    return true;
  }
  return isSameLocationName(stage.from, state.activeWarehouse);
}

function canManageIncomingStage(stage) {
  if (!stage) {
    return false;
  }
  if (isManagerUser()) {
    return true;
  }
  return isSameLocationName(stage.to, state.activeWarehouse);
}

function isKnownFactoryLocation(name) {
  const normalized = normalizeLocationName(name);
  if (!normalized) {
    return false;
  }
  return state.factories.some((factory) => normalizeLocationName(factory.name) === normalized);
}

function getManageableLineItemsForWarehouse(stage, warehouseName) {
  if (!stage || !Array.isArray(stage.lineItems)) {
    return [];
  }
  return stage.lineItems.filter((item) => isSameLocationName(item.origin, warehouseName));
}

function clamp(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return min;
  }
  return Math.min(Math.max(number, min), max);
}

function isStageDispatchReady(stage) {
  if (!stage) {
    return false;
  }

  if (!stage.dispatchApproval?.approved) {
    return false;
  }

  if (!Array.isArray(stage.lineItems) || stage.lineItems.length === 0) {
    return true;
  }

  return stage.lineItems.every((item) => {
    const qty = Number(item.qty) || 0;
    const ready = clamp(item.readyQty, 0, qty);
    const missing = clamp(item.missingQty, 0, qty);
    return Math.round(ready + missing) === Math.round(qty);
  });
}

function resetStageApproval(stage) {
  if (!stage?.dispatchApproval) {
    return;
  }
  stage.dispatchApproval.approved = false;
  stage.dispatchApproval.approvedBy = null;
  stage.dispatchApproval.timestamp = null;
  stage.dispatchApproval.note = '';
}

function updateLineItemQuantities(orderId, stageId, itemIndex, field, value) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    return;
  }
  const stage = order.stages.find((item) => item.id === stageId);
  if (!stage || !Array.isArray(stage.lineItems)) {
    return;
  }

  if (!canManageOutgoingStage(stage) || stage.progress >= 2) {
    window.alert('Bu aşamadaki stok hazırlığı sadece ilgili fabrika tarafından güncellenebilir.');
    renderHatManagement();
    return;
  }

  const index = Number(itemIndex);
  if (!Number.isInteger(index) || index < 0 || index >= stage.lineItems.length) {
    return;
  }

  const lineItem = stage.lineItems[index];
  if (lineItem?.isLocal === false) {
    renderHatManagement();
    return;
  }
  const qty = Number(lineItem.qty) || 0;
  const numericValue = clamp(value, 0, qty);

  if (field === 'ready') {
    lineItem.readyQty = Math.round(numericValue);
    lineItem.missingQty = Math.max(0, qty - lineItem.readyQty);
  } else if (field === 'missing') {
    lineItem.missingQty = Math.round(numericValue);
    lineItem.readyQty = Math.max(0, qty - lineItem.missingQty);
  }

  resetStageApproval(stage);
  renderHatManagement();
}

function setLineItemComplete(orderId, stageId, itemIndex) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    return;
  }
  const stage = order.stages.find((item) => item.id === stageId);
  if (!stage || !Array.isArray(stage.lineItems)) {
    return;
  }

  if (!canManageOutgoingStage(stage) || stage.progress >= 2) {
    window.alert('Bu aşamadaki stok hazırlığı sadece ilgili fabrika tarafından güncellenebilir.');
    renderHatManagement();
    return;
  }

  const index = Number(itemIndex);
  if (!Number.isInteger(index) || index < 0 || index >= stage.lineItems.length) {
    return;
  }

  const lineItem = stage.lineItems[index];
  if (lineItem?.isLocal === false) {
    renderHatManagement();
    return;
  }
  lineItem.readyQty = Number(lineItem.qty) || 0;
  lineItem.missingQty = 0;
  resetStageApproval(stage);
  renderHatManagement();
}

function toggleStageApproval(orderId, stageId, approved) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    renderHatManagement();
    return false;
  }
  const stage = order.stages.find((item) => item.id === stageId);
  if (!stage) {
    renderHatManagement();
    return false;
  }

  if (!canManageOutgoingStage(stage)) {
    window.alert('Bu sevkiyat durumunu yalnızca ilgili fabrikanın ekibi güncelleyebilir.');
    renderHatManagement();
    return false;
  }

  if (stage.progress !== 1) {
    window.alert('Stok onayı sadece "Hazırlanıyor" durumundaki sevkiyatlar için verilebilir.');
    renderHatManagement();
    return false;
  }

  stage.dispatchApproval = stage.dispatchApproval || {
    approved: false,
    approvedBy: null,
    timestamp: null,
    note: ''
  };

  if (approved) {
    const quantitiesValid = isStageDispatchReady({ ...stage, dispatchApproval: { approved: true } });
    if (!quantitiesValid) {
      window.alert('Hazır ve eksik miktarların toplamı ürün adedine eşit olmalıdır.');
      renderHatManagement();
      return false;
    }
    stage.dispatchApproval.approved = true;
    stage.dispatchApproval.timestamp = formatNow();
    const approver = getActiveUser();
    stage.dispatchApproval.approvedBy = approver?.name ?? 'Bilinmeyen Kullanıcı';
    addHistory(order, `${stage.from}: Çıkış onayı ${stage.dispatchApproval.approvedBy} tarafından verildi.`);
  } else {
    resetStageApproval(stage);
  }

  renderHatManagement();
  return true;
}

function bindNavigation() {
  const navButtons = document.querySelectorAll('.nav-item');
  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      navButtons.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
      state.activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab-view').forEach((section) => {
        section.classList.toggle('active', section.id === `tab-${state.activeTab}`);
      });
    });
  });
}

function bindGlobalActions() {
  document.getElementById('add-order-btn').addEventListener('click', () => {
    if (!userHasPermission('addOrder')) {
      window.alert('Yeni sipariş ekleme işlemi yalnızca Satış Operasyon rolü tarafından yapılabilir.');
      return;
    }
    openModal('order');
  });
  document.getElementById('add-product-btn').addEventListener('click', () => openModal('product'));
  document.getElementById('delete-order-btn').addEventListener('click', deleteActiveOrder);
  document.getElementById('dispatch-all-btn').addEventListener('click', dispatchAllFromWarehouse);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target.id === 'modal') {
      closeModal();
    }
  });

  document.getElementById('orders-table-body').addEventListener('click', handleOrderTableClick);
  document.getElementById('order-detail').addEventListener('click', handleOrderDetailAction);
  const incomingList = document.getElementById('incoming-list');
  incomingList.addEventListener('change', handleIncomingAction);
  incomingList.addEventListener('click', handleIncomingAction);
  const outgoingList = document.getElementById('outgoing-list');
  outgoingList.addEventListener('click', handleOutgoingAction);
  outgoingList.addEventListener('input', handleOutgoingAction);
  outgoingList.addEventListener('change', handleOutgoingAction);
  document.getElementById('product-table-body').addEventListener('change', handleProductFactoryChange);
}

function setupWarehouseSelect() {
  const select = document.getElementById('warehouse-select');
  if (!select) {
    return;
  }
  select.innerHTML = state.factories
    .map((factory) => `<option value="${factory.name}">${factory.name}</option>`)
    .join('');
  select.value = state.activeWarehouse;
  select.addEventListener('change', (event) => {
    state.activeWarehouse = event.target.value;
    const user = getActiveUser();
    if (user) {
      user.warehouse = state.activeWarehouse;
    }
    renderHatManagement();
  });
}

function setupUserControls() {
  const userSelect = document.getElementById('user-select');
  if (userSelect) {
    userSelect.innerHTML = state.users
      .map((user) => `<option value="${user.id}">${user.name}</option>`)
      .join('');
    userSelect.value = state.activeUserId;
    userSelect.addEventListener('change', (event) => {
      state.activeUserId = event.target.value;
      const activeUser = getActiveUser();
      if (activeUser) {
        state.activeWarehouse = activeUser.warehouse;
      }
      updateUserArea();
      renderAll();
    });
  }

  const manageRolesBtn = document.getElementById('manage-roles-btn');
  if (manageRolesBtn) {
    manageRolesBtn.addEventListener('click', () => {
      if (!userHasPermission('manageRoles')) {
        window.alert('Rol değişiklikleri yalnızca yöneticiler tarafından yapılabilir.');
        return;
      }
      openModal('role');
    });
  }

  updateUserArea();
}

function updateUserArea() {
  const activeUser = getActiveUser();
  if (activeUser) {
    state.activeWarehouse = activeUser.warehouse;
  }
  updateUserSelect();
  updateWarehouseSelect();
  updateRoleDisplay();
  updatePermissionSensitiveUI();
  updateRoleManagementVisibility();
}

function getActiveUser() {
  return state.users.find((user) => user.id === state.activeUserId) ?? null;
}

function getRoleDefinition(roleId) {
  return roleDefinitions[roleId] ?? null;
}

function getRoleName(roleId) {
  return getRoleDefinition(roleId)?.name ?? 'Tanımsız Rol';
}

function userHasPermission(permission) {
  const activeUser = getActiveUser();
  if (!activeUser) {
    return false;
  }
  const role = getRoleDefinition(activeUser.roleId);
  return Boolean(role?.permissions?.[permission]);
}

function updateUserSelect() {
  const userSelect = document.getElementById('user-select');
  if (userSelect) {
    userSelect.value = state.activeUserId;
  }
}

function updateWarehouseSelect() {
  const select = document.getElementById('warehouse-select');
  if (select) {
    select.value = state.activeWarehouse;
  }
}

function updateRoleDisplay() {
  const roleDisplay = document.getElementById('role-display');
  const activeUser = getActiveUser();
  if (roleDisplay) {
    roleDisplay.textContent = activeUser ? getRoleName(activeUser.roleId) : '-';
  }
}

function updatePermissionSensitiveUI() {
  const addOrderBtn = document.getElementById('add-order-btn');
  if (addOrderBtn) {
    const canAddOrder = userHasPermission('addOrder');
    addOrderBtn.disabled = !canAddOrder;
    addOrderBtn.title = canAddOrder
      ? 'Yeni sipariş ekleyin'
      : 'Sipariş ekleme işlemi Satış Operasyon rolü tarafından yapılabilir.';
  }
}

function updateRoleManagementVisibility() {
  const manageRolesBtn = document.getElementById('manage-roles-btn');
  if (manageRolesBtn) {
    const canManage = userHasPermission('manageRoles');
    manageRolesBtn.classList.toggle('hidden', !canManage);
    manageRolesBtn.disabled = !canManage;
  }
}

function getFactoryNameById(factoryId) {
  return state.factories.find((factory) => factory.id === factoryId)?.name ?? '';
}

function createRoleOptions(selectedRoleId) {
  return Object.entries(roleDefinitions)
    .map(([roleId, role]) => `<option value="${roleId}" ${roleId === selectedRoleId ? 'selected' : ''}>${role.name}</option>`)
    .join('');
}

function renderAll() {
  renderOrdersTable();
  renderOrderDetail();
  renderArchive();
  renderProductManagement();
  renderFactorySummary();
  renderHatManagement();
  updateUserArea();
}

function renderOrdersTable() {
  const tbody = document.getElementById('orders-table-body');
  tbody.innerHTML = '';

  state.orders.forEach((order) => {
    const tr = document.createElement('tr');
    tr.dataset.orderId = order.id;
    if (order.id === state.activeOrderId) {
      tr.classList.add('selected');
    }

    const statusText = order.statusHistory[order.statusHistory.length - 1]?.note ?? 'Durum yok';

    tr.innerHTML = `
      <td><button class="icon-btn" data-role="detail" data-order-id="${order.id}" aria-label="Detay">ℹ️</button></td>
      <td>${order.orderDate}</td>
      <td>${order.invoiceNumber}</td>
      <td>${order.type}</td>
      <td>${order.routeType}</td>
      <td>${order.accountName}</td>
      <td>${statusText}</td>
      <td>${order.lastUpdate}</td>
    `;

    tbody.appendChild(tr);
  });

  if (!state.activeOrderId && state.orders.length > 0) {
    state.activeOrderId = state.orders[0].id;
  }
}

function renderOrderDetail() {
  const container = document.getElementById('order-detail');
  container.innerHTML = '';

  if (!state.activeOrderId) {
    container.innerHTML = '<p>Bir sipariş seçerek detayları görüntüleyin.</p>';
    return;
  }

  const order = state.orders.find((item) => item.id === state.activeOrderId);
  if (!order) {
    container.innerHTML = '<p>Seçilen sipariş bulunamadı.</p>';
    return;
  }

  const template = document.getElementById('order-detail-template');
  const fragment = template.content.cloneNode(true);

  fragment.querySelector('[data-field="orderDate"]').textContent = order.orderDate;
  fragment.querySelector('[data-field="invoiceNumber"]').textContent = order.invoiceNumber;
  fragment.querySelector('[data-field="routeType"]').textContent = order.routeType;
  fragment.querySelector('[data-field="accountName"]').textContent = order.accountName;
  fragment.querySelector('[data-field="currentLocation"]').textContent = order.currentLocation || '-';
  fragment.querySelector('[data-field="nextLocation"]').textContent = order.nextLocation || '-';
  fragment.querySelector('[data-field="estimatedDelivery"]').textContent = order.estimatedDelivery || '-';

  const finalStop = order.finalDestination || order.stages[order.stages.length - 1]?.to || order.nextLocation || '-';

  const finalDestinationField = fragment.querySelector('[data-field="finalDestination"]');
  if (finalDestinationField) {
    finalDestinationField.textContent = finalStop;
  }

  const currentLocationInput = fragment.querySelector('[data-field="currentLocationInput"]');
  if (currentLocationInput) {
    currentLocationInput.value = order.currentLocation ?? '';
  }

  const nextLocationInput = fragment.querySelector('[data-field="nextLocationInput"]');
  if (nextLocationInput) {
    nextLocationInput.value = order.nextLocation ?? '';
  }

  const estimateInput = fragment.querySelector('[data-field="estimateInput"]');
  if (estimateInput) {
    estimateInput.value = toDateTimeLocalValue(order.estimatedDelivery);
  }

  const noteInput = fragment.querySelector('[data-field="noteInput"]');
  if (noteInput) {
    noteInput.value = '';
  }

  fragment
    .querySelectorAll('[data-action="add-estimate"]')
    .forEach((button) => {
      button.dataset.orderId = order.id;
    });

  const productList = fragment.querySelector('[data-field="productList"]');
  if (order.products.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Bu siparişe ait ürün kaydı bulunmuyor.';
    productList.appendChild(empty);
  } else {
    order.products.forEach((product) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${product.name}</strong>
        <span>Kod: ${product.code}</span>
        <span>Miktar: ${product.qty}</span>
        <span>Üretim: ${product.origin}</span>
      `;
      productList.appendChild(li);
    });
  }

  const statusList = fragment.querySelector('[data-field="statusHistory"]');
  if (order.statusHistory.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Henüz durum bilgisi girilmedi.';
    statusList.appendChild(li);
  } else {
    order.statusHistory.forEach((status) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <time>${status.timestamp}</time>
        <span>${status.note}</span>
      `;
      statusList.appendChild(li);
    });
  }

  const stageList = fragment.querySelector('[data-field="stages"]');
  order.stages.forEach((stage) => {
    const li = document.createElement('li');
    const badge = document.createElement('span');
    badge.className = 'badge stage-badge';
    badge.textContent = `Durum: ${stage.status}`;

    li.innerHTML = `
      <strong>${stage.from} → ${stage.to}</strong>
      <span class="muted">Planlanan Çıkış: ${stage.plannedStart} • Planlanan Varış: ${stage.plannedArrival}</span>
      <span class="muted">Taşıma: ${stage.transport} • Sorumlu: ${stage.responsible}</span>
      <span>${stage.note}</span>
    `;
    li.appendChild(badge);

    if (!stage.completed) {
      const actions = document.createElement('div');
      actions.className = 'stage-actions';
      const btn = document.createElement('button');
      btn.className = 'btn secondary small';
      btn.dataset.action = 'advance-stage';
      btn.dataset.stageId = stage.id;
      btn.dataset.orderId = order.id;
      btn.textContent = 'Sonraki Durum';
      actions.appendChild(btn);
      li.appendChild(actions);
    }

    stageList.appendChild(li);
  });

  container.appendChild(fragment);
}

function renderArchive() {
  const tbody = document.getElementById('archive-table-body');
  tbody.innerHTML = '';

  state.archivedOrders.forEach((order) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${order.orderDate}</td>
      <td>${order.invoiceNumber}</td>
      <td>${order.type}</td>
      <td>${order.routeType}</td>
      <td>${order.accountName}</td>
      <td>${order.finalDestination ?? '-'}</td>
      <td>${order.deliveredAt}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderProductManagement() {
  const tbody = document.getElementById('product-table-body');
  tbody.innerHTML = '';

  state.productCatalog.forEach((product) => {
    const tr = document.createElement('tr');
    const codeCell = document.createElement('td');
    codeCell.textContent = product.code;
    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;
    const factoryCell = document.createElement('td');
    const groupCell = document.createElement('td');
    groupCell.textContent = product.groups.join(', ');

    const select = document.createElement('select');
    select.dataset.productCode = product.code;
    state.factories.forEach((factory) => {
      const option = document.createElement('option');
      option.value = factory.id;
      option.textContent = factory.name;
      select.appendChild(option);
    });
    select.value = product.factoryId;
    factoryCell.appendChild(select);

    tr.append(codeCell, nameCell, factoryCell, groupCell);
    tbody.appendChild(tr);
  });
}

function renderFactorySummary() {
  const list = document.getElementById('factory-summary');
  list.innerHTML = '';

  state.factories.forEach((factory) => {
    const li = document.createElement('li');
    const assignedProducts = state.productCatalog.filter((product) => product.factoryId === factory.id);
    const productLabel = assignedProducts.length
      ? assignedProducts.slice(0, 3).map((item) => item.name).join(', ') + (assignedProducts.length > 3 ? '…' : '')
      : 'Henüz ürün atanmadı.';
    li.innerHTML = `
      <strong>${factory.name}</strong>
      <span class="muted">${factory.city} • ${factory.manager}</span>
      <span>Ürün Grupları: ${factory.productGroups.join(', ')}</span>
      <span class="muted">Panelde kayıtlı ${assignedProducts.length} ürün • ${productLabel}</span>
    `;
    list.appendChild(li);
  });
}

function renderHatManagement() {
  const incomingContainer = document.getElementById('incoming-list');
  const outgoingContainer = document.getElementById('outgoing-list');
  incomingContainer.innerHTML = '';
  outgoingContainer.innerHTML = '';

  const activeWarehouse = state.activeWarehouse;

  const incomingStages = [];
  const outgoingStages = [];
  const deliveredReceipts = state.warehouseReceipts[activeWarehouse] ?? [];

  state.orders.forEach((order) => {
    order.stages.forEach((stage) => {
      if (stage.to === activeWarehouse && stage.progress >= 1 && stage.progress < 3) {
        incomingStages.push({ order, stage });
      }
      if (stage.from === activeWarehouse && stage.progress < 2) {
        outgoingStages.push({ order, stage });
      }
    });
  });

  if (incomingStages.length > 0) {
    incomingStages.forEach(({ order, stage }) => {
      const card = document.createElement('div');
      card.className = 'hat-card';
      if (stage.shortageFlagged) {
        card.classList.add('shortage');
      }
      card.innerHTML = `
        <div class="hat-card-header">
          <strong>${order.id}</strong>
          <span class="badge">${stage.status}</span>
        </div>
        <span>Cari: ${order.accountName || '-'}</span>
        <span>Nereden: ${stage.from}</span>
        <span>Planlanan Varış: ${stage.plannedArrival}</span>
        <span>Ürün Notu: ${stage.note}</span>
      `;
      if (stage.shortageFlagged) {
        const header = card.querySelector('.hat-card-header');
        if (header) {
          const shortageBadge = document.createElement('span');
          shortageBadge.className = 'badge warning';
          shortageBadge.textContent = 'Eksik Ürün';
          header.appendChild(shortageBadge);
        }
      }
      const actions = document.createElement('div');
      actions.className = 'hat-card-actions';

      const checkbox = document.createElement('label');
      checkbox.className = 'checkbox';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.dataset.action = 'approve-stage';
      input.dataset.stageId = stage.id;
      input.dataset.orderId = order.id;
      input.checked = stage.progress >= 3;
      input.disabled = stage.progress < 2 || !canManageIncomingStage(stage);
      checkbox.append(input, document.createTextNode('Onay'));
      actions.appendChild(checkbox);

      const manageableIncoming = getManageableLineItemsForWarehouse(stage, activeWarehouse);
      if (manageableIncoming.length > 0) {
        const shortageBtn = document.createElement('button');
        shortageBtn.type = 'button';
        shortageBtn.className = 'btn warning small';
        shortageBtn.dataset.action = 'report-shortage';
        shortageBtn.dataset.stageId = stage.id;
        shortageBtn.dataset.orderId = order.id;
        shortageBtn.textContent = 'Eksik Ürün';
        shortageBtn.disabled = stage.progress < 2 || stage.shortageFlagged || !canManageIncomingStage(stage);
        if (shortageBtn.disabled && !stage.shortageFlagged) {
          shortageBtn.title = 'Eksik ürün bildirimi için sevkiyatın ambara giriş yapması gerekir.';
        }
        actions.appendChild(shortageBtn);
      } else {
        const info = document.createElement('span');
        info.className = 'muted';
        info.textContent = 'Eksik ürün bildirimi üretim sorumlularına açıktır.';
        actions.appendChild(info);
      }

      card.appendChild(actions);
      incomingContainer.appendChild(card);
    });
  }

  if (deliveredReceipts.length > 0) {
    const section = document.createElement('div');
    section.className = 'hat-subsection';
    const heading = document.createElement('h4');
    heading.className = 'hat-subsection-title';
    heading.textContent = 'Teslim Alınan Siparişler';
    section.appendChild(heading);

    deliveredReceipts.forEach((receipt) => {
      const card = document.createElement('div');
      card.className = 'hat-card delivered';
      card.innerHTML = `
        <div class="hat-card-header">
          <strong>${receipt.orderId}</strong>
          <span class="badge">Teslim Alındı</span>
        </div>
        <span>Cari: ${receipt.accountName ?? '-'}</span>
        <span>Nereden: ${receipt.from}</span>
        <span>Teslim Tarihi: ${receipt.deliveredAt}</span>
        ${receipt.note ? `<span class="muted">${receipt.note}</span>` : ''}
      `;
      section.appendChild(card);
    });

    incomingContainer.appendChild(section);
  }

  if (incomingStages.length === 0 && deliveredReceipts.length === 0) {
    incomingContainer.innerHTML = '<p class="muted">Gelen sipariş bulunmuyor.</p>';
  }

  if (outgoingStages.length === 0) {
    outgoingContainer.innerHTML = '<p class="muted">Çıkış için bekleyen sipariş yok.</p>';
  } else {
    outgoingStages.forEach(({ order, stage }) => {
      const card = document.createElement('div');
      card.className = 'hat-card';

      const hasLineItems = Array.isArray(stage.lineItems) && stage.lineItems.length > 0;
      const manageAllowed = canManageOutgoingStage(stage);
      const hasMissing =
        hasLineItems &&
        stage.lineItems.some((item) => item?.isLocal !== false && Number(item.missingQty) > 0);

      if (stage.shortageFlagged || hasMissing) {
        card.classList.add('shortage');
      }

      const header = document.createElement('div');
      header.className = 'hat-card-header';
      const title = document.createElement('strong');
      title.textContent = order.id;
      const statusBadge = document.createElement('span');
      statusBadge.className = 'badge';
      statusBadge.textContent = stage.status;
      header.append(title, statusBadge);
      if (stage.shortageFlagged || hasMissing) {
        const shortageBadge = document.createElement('span');
        shortageBadge.className = 'badge warning';
        shortageBadge.textContent = 'Eksik Ürün';
        header.appendChild(shortageBadge);
      }
      card.appendChild(header);

      const accountInfo = document.createElement('span');
      accountInfo.textContent = `Cari: ${order.accountName || '-'}`;
      card.appendChild(accountInfo);

      const destination = document.createElement('span');
      destination.textContent = `Nereye: ${stage.to}`;
      card.appendChild(destination);

      const plannedStart = document.createElement('span');
      plannedStart.textContent = `Planlanan Çıkış: ${stage.plannedStart}`;
      card.appendChild(plannedStart);

      const responsible = document.createElement('span');
      responsible.textContent = `Sorumlu: ${stage.responsible}`;
      card.appendChild(responsible);

      if (hasLineItems) {
        const table = document.createElement('table');
        table.className = 'hat-line-table';
        const thead = document.createElement('thead');
        thead.innerHTML = '<tr><th>Ürün</th><th>Toplam</th><th>Hazır</th><th>Eksik</th><th>Durum</th></tr>';
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        stage.lineItems.forEach((item, index) => {
          const tr = document.createElement('tr');
          const isLocal = item?.isLocal !== false;
          if (!isLocal) {
            tr.classList.add('external');
          }
          if (isLocal && Number(item.missingQty) > 0) {
            tr.classList.add('missing');
          }

          const productCell = document.createElement('td');
          const originNote = !isLocal
            ? `<span class="origin-note">Üretim: ${item.origin || '-'}</span>`
            : '';
          productCell.innerHTML = `<strong>${item.productName}</strong><span class="muted">Kod: ${item.productCode}</span>${originNote}`;
          tr.appendChild(productCell);

          const qtyCell = document.createElement('td');
          qtyCell.textContent = item.qty;
          tr.appendChild(qtyCell);

          const readyCell = document.createElement('td');
          if (isLocal) {
            const readyInput = document.createElement('input');
            readyInput.type = 'number';
            readyInput.min = '0';
            readyInput.step = '1';
            readyInput.max = String(item.qty);
            readyInput.value = item.readyQty ?? item.qty;
            readyInput.dataset.action = 'line-ready';
            readyInput.dataset.stageId = stage.id;
            readyInput.dataset.orderId = order.id;
            readyInput.dataset.itemIndex = String(index);
            readyInput.disabled = stage.progress >= 2 || !manageAllowed;
            readyCell.appendChild(readyInput);
          } else {
            readyCell.innerHTML = '<span class="no-control">-</span>';
          }
          tr.appendChild(readyCell);

          const missingCell = document.createElement('td');
          if (isLocal) {
            const missingInput = document.createElement('input');
            missingInput.type = 'number';
            missingInput.min = '0';
            missingInput.step = '1';
            missingInput.max = String(item.qty);
            missingInput.value = item.missingQty ?? 0;
            missingInput.dataset.action = 'line-missing';
            missingInput.dataset.stageId = stage.id;
            missingInput.dataset.orderId = order.id;
            missingInput.dataset.itemIndex = String(index);
            missingInput.disabled = stage.progress >= 2 || !manageAllowed;
            missingCell.appendChild(missingInput);
          } else {
            missingCell.innerHTML = '<span class="no-control">-</span>';
          }
          tr.appendChild(missingCell);

          const statusCell = document.createElement('td');
          const statusIndicator = document.createElement('span');
          if (isLocal) {
            const missingCount = Number(item.missingQty) || 0;
            statusIndicator.className = `badge ${missingCount > 0 ? 'warning' : 'success'}`;
            statusIndicator.textContent = missingCount > 0 ? `Eksik (${missingCount})` : 'Tam';
            statusCell.appendChild(statusIndicator);
            if (stage.progress < 2 && manageAllowed) {
              const fillBtn = document.createElement('button');
              fillBtn.type = 'button';
              fillBtn.className = 'btn ghost small';
              fillBtn.dataset.action = 'fill-complete';
              fillBtn.dataset.stageId = stage.id;
              fillBtn.dataset.orderId = order.id;
              fillBtn.dataset.itemIndex = String(index);
              fillBtn.textContent = 'Tam';
              statusCell.appendChild(fillBtn);
            }
          } else {
            statusIndicator.className = 'badge neutral';
            statusIndicator.textContent = 'Üretim Dışı';
            statusCell.appendChild(statusIndicator);
          }
          tr.appendChild(statusCell);
          tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        card.appendChild(table);
        const hasExternalProducts = stage.lineItems.some((item) => item?.isLocal === false);
        if (hasExternalProducts) {
          const infoLine = document.createElement('span');
          infoLine.className = 'muted info-line';
          infoLine.textContent = 'Üretiminde olmadığınız ürünlerin stok eksikliği bildirimi kapalıdır.';
          card.appendChild(infoLine);
        }
      }

      const approval = document.createElement('div');
      approval.className = 'hat-approval';
      const approvalLabel = document.createElement('label');
      approvalLabel.className = 'checkbox';
      const approvalInput = document.createElement('input');
      approvalInput.type = 'checkbox';
      approvalInput.dataset.action = 'toggle-approval';
      approvalInput.dataset.stageId = stage.id;
      approvalInput.dataset.orderId = order.id;
      approvalInput.checked = Boolean(stage.dispatchApproval?.approved);
      const approvalEnabled = stage.progress === 1 && manageAllowed;
      approvalInput.disabled = !approvalEnabled;
      approvalLabel.append(approvalInput, document.createTextNode('Çıkış Onayı'));
      approval.appendChild(approvalLabel);

      const approvalInfo = document.createElement('span');
      approvalInfo.className = 'hat-approval-info';
      if (stage.dispatchApproval?.approved && stage.dispatchApproval.timestamp) {
        const approver = stage.dispatchApproval.approvedBy ?? 'Onaylandı';
        approvalInfo.textContent = `${approver} • ${stage.dispatchApproval.timestamp}`;
      } else {
        approvalInfo.textContent = approvalEnabled
          ? 'Onay bekleniyor'
          : 'Hazırlanıyor durumuna geçildiğinde onay verilebilir.';
        approvalInfo.classList.add('pending');
      }
      approval.appendChild(approvalInfo);
      card.appendChild(approval);

      const actions = document.createElement('div');
      actions.className = 'hat-card-actions';
      if (stage.progress < 2) {
        const sendBtn = document.createElement('button');
        sendBtn.className = 'btn primary small';
        sendBtn.dataset.action = 'dispatch-stage';
        sendBtn.dataset.stageId = stage.id;
        sendBtn.dataset.orderId = order.id;
        sendBtn.textContent = 'Gönder';
        if (!manageAllowed) {
          sendBtn.disabled = true;
          sendBtn.title = 'Bu sevkiyat farklı bir fabrika tarafından yönetiliyor.';
        } else if (!isStageDispatchReady(stage)) {
          sendBtn.disabled = true;
          sendBtn.title = 'Çıkış onayı ve ürün kontrollerini tamamlayın.';
        } else {
          sendBtn.title = '';
        }
        actions.appendChild(sendBtn);
      } else {
        const info = document.createElement('span');
        info.className = 'muted';
        info.textContent = 'Sevk yolda.';
        actions.appendChild(info);
      }
      card.appendChild(actions);
      outgoingContainer.appendChild(card);
    });
  }
}

function handleOrderTableClick(event) {
  const target = event.target.closest('[data-order-id]');
  if (!target) {
    return;
  }

  const orderId = target.dataset.orderId;
  state.activeOrderId = orderId;
  renderAll();
}

function handleOrderDetailAction(event) {
  const action = event.target.dataset.action;
  if (!action) {
    return;
  }

  if (action === 'back') {
    state.activeOrderId = null;
    renderOrderDetail();
    renderOrdersTable();
    return;
  }

  const orderId = event.target.dataset.orderId ?? state.activeOrderId;
  const stageId = event.target.dataset.stageId;

  if (action === 'add-estimate') {
    const estimate = window.prompt('Tahmini teslimat zamanını girin (GG.AA.YYYY SS:DD):');
    if (estimate) {
      const order = state.orders.find((item) => item.id === orderId);
      if (order) {
        order.estimatedDelivery = estimate;
        order.lastUpdate = formatNow();
        addHistory(order, `Tahmini teslimat ${estimate} olarak güncellendi.`);
        renderAll();
      }
    }
    return;
  }

  if (action === 'save-order') {
    const container = document.getElementById('order-detail');
    const order = state.orders.find((item) => item.id === orderId);
    if (!order || !container) {
      return;
    }

    const currentInput = container.querySelector('[data-field="currentLocationInput"]');
    const nextInput = container.querySelector('[data-field="nextLocationInput"]');
    const estimateInput = container.querySelector('[data-field="estimateInput"]');
    const noteInput = container.querySelector('[data-field="noteInput"]');

    const trimmedCurrent = currentInput?.value.trim() ?? '';
    const trimmedNext = nextInput?.value.trim() ?? '';
    const estimateValue = estimateInput?.value ?? '';
    const manualNote = noteInput?.value.trim() ?? '';

    const normalizedCurrent = trimmedCurrent ? trimmedCurrent : null;
    const normalizedNext = trimmedNext ? trimmedNext : null;
    const formattedEstimate = formatDateFromInput(estimateValue);
    const normalizedEstimate = formattedEstimate ? formattedEstimate : null;

    const previousCurrent = order.currentLocation ?? null;
    const previousNext = order.nextLocation ?? null;
    const previousEstimate = order.estimatedDelivery ?? null;

    const changes = [];
    let hasChanges = false;

    if (normalizedCurrent !== previousCurrent) {
      order.currentLocation = normalizedCurrent;
      hasChanges = true;
      changes.push(`Cari konum ${previousCurrent ?? '-'} → ${normalizedCurrent ?? '-'}`);
    }

    if (normalizedNext !== previousNext) {
      order.nextLocation = normalizedNext;
      hasChanges = true;
      changes.push(`Sıradaki konum ${previousNext ?? '-'} → ${normalizedNext ?? '-'}`);
    }

    if (normalizedEstimate !== previousEstimate) {
      order.estimatedDelivery = normalizedEstimate;
      hasChanges = true;
      changes.push(`Tahmini teslimat ${previousEstimate ?? '-'} → ${normalizedEstimate ?? '-'}`);
    }

    if (manualNote) {
      addHistory(order, manualNote);
      hasChanges = true;
    } else if (changes.length > 0) {
      addHistory(order, `Güncelleme: ${changes.join(' • ')}`);
    }

    if (noteInput) {
      noteInput.value = '';
    }

    if (hasChanges) {
      order.lastUpdate = formatNow();
      renderAll();
    }
    return;
  }

  if (action === 'advance-stage' && orderId && stageId) {
    advanceStage(orderId, stageId);
  }
}

function handleIncomingAction(event) {
  const target = event.target;
  const action = target.dataset.action;
  if (!action) {
    return;
  }

  const { orderId, stageId } = target.dataset;

  if (action === 'approve-stage' && event.type === 'change') {
    if (target.checked) {
      completeStage(orderId, stageId);
    }
    return;
  }

  if (action === 'report-shortage' && event.type === 'click') {
    event.preventDefault();
    reportStageShortage(orderId, stageId);
  }
}

function handleOutgoingAction(event) {
  const target = event.target;
  const action = target.dataset.action;
  if (!action) {
    return;
  }

  if ((action === 'line-ready' || action === 'line-missing') && (event.type === 'input' || event.type === 'change')) {
    const { orderId, stageId, itemIndex } = target.dataset;
    const field = action === 'line-ready' ? 'ready' : 'missing';
    updateLineItemQuantities(orderId, stageId, itemIndex, field, target.value);
    return;
  }

  if (action === 'fill-complete' && event.type === 'click') {
    event.preventDefault();
    const { orderId, stageId, itemIndex } = target.dataset;
    setLineItemComplete(orderId, stageId, itemIndex);
    return;
  }

  if (action === 'toggle-approval' && event.type === 'change') {
    const { orderId, stageId } = target.dataset;
    toggleStageApproval(orderId, stageId, target.checked);
    return;
  }

  if (action === 'dispatch-stage' && event.type === 'click') {
    const { orderId, stageId } = target.dataset;
    dispatchStage(orderId, stageId);
  }
}

function handleProductFactoryChange(event) {
  const select = event.target;
  if (!select.dataset.productCode) {
    return;
  }

  const product = state.productCatalog.find((item) => item.code === select.dataset.productCode);
  if (!product) {
    return;
  }

  product.factoryId = select.value;
  renderFactorySummary();
}

function openModal(type) {
  modalState.type = type;
  const modal = document.getElementById('modal');
  const form = document.getElementById('modal-form');
  const title = document.getElementById('modal-title');
  form.innerHTML = '';

  if (type === 'order') {
    title.textContent = 'Yeni Sipariş Oluştur';
    const suggestedInvoice = generateInvoiceNumber();
    const openedAt = formatNow();
    form.innerHTML = `
      <div class="form-group readonly">
        <label>Sipariş Tarihi</label>
        <div class="readonly-field" data-order-date-display>${openedAt}</div>
      </div>
      <div class="form-group">
        <label>Fatura Numarası</label>
        <input type="text" name="invoiceNumber" value="${suggestedInvoice}" required placeholder="Örn. 123456" />
      </div>
      <div class="form-group">
        <label>Sipariş Türü</label>
        <select name="orderType" required>
          <option value="Şantiye">Şantiye</option>
          <option value="Bölge">Bölge</option>
          <option value="Müşteri Depo">Müşteri Depo</option>
        </select>
      </div>
      <div class="form-group">
        <label>Hat Tipi</label>
        <select name="routeType" required data-route-select>
          <option value="Direkt">Direkt</option>
          <option value="Bölge">Bölge</option>
          <option value="Birleştirme">Birleştirme</option>
        </select>
      </div>
      <div class="form-group">
        <label>Cari / Proje Adı</label>
        <input type="text" name="accountName" required placeholder="Örn. Hatay Konut Projesi" />
      </div>
      <div class="form-group">
        <label>Çıkış Fabrikası</label>
        <select name="startFactory" required data-start-factory>
          ${state.factories.map((factory) => `<option value="${factory.id}">${factory.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group" data-consolidation-group>
        <label>Birleştirme Fabrikası</label>
        <select name="consolidationFactory" data-consolidation-factory>
          <option value="">Seçiniz</option>
          ${state.factories.map((factory) => `<option value="${factory.id}">${factory.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Çıkış İli</label>
        <select name="startProvince" required data-start-province>
          ${provinceOptions.map((province) => `<option value="${province}">${province}</option>`).join('')}
        </select>
      </div>
      <div class="form-group" data-consolidation-province-group>
        <label>Birleştirme İli</label>
        <select name="consolidationProvince" data-consolidation-province>
          <option value="">Seçiniz</option>
          ${provinceOptions.map((province) => `<option value="${province}">${province}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Son Durak İli</label>
        <select name="finalProvince" required data-final-province>
          ${provinceOptions.map((province) => `<option value="${province}">${province}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Son Varış Konumu</label>
        <input type="text" name="finalDestination" required placeholder="Örn. Hatay Şantiye" data-final-destination-input />
      </div>
      <div class="form-group">
        <label>Tahmini Teslimat</label>
        <input type="datetime-local" name="estimatedDelivery" />
      </div>
      <div class="form-section product-form-section">
        <div class="form-section-header">
          <h4>Ürün Listesi</h4>
          <p class="form-hint">Siparişe dahil edilen ürünleri ve miktarlarını girin.</p>
        </div>
        <div class="product-rows" data-product-rows></div>
        <button type="button" class="btn secondary small" data-action="add-product-row">Ürün Satırı Ekle</button>
      </div>
      <div class="form-group">
        <label>Not</label>
        <textarea name="note" placeholder="Sevkiyat notlarını giriniz"></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn ghost" id="modal-cancel">Vazgeç</button>
        <button type="submit" class="btn primary">Kaydet</button>
      </div>
    `;
  } else if (type === 'product') {
    title.textContent = 'Yeni Ürün Ekle';
    form.innerHTML = `
      <div class="form-group">
        <label>Ürün Kodu</label>
        <input type="text" name="productCode" required />
      </div>
      <div class="form-group">
        <label>Ürün Adı</label>
        <input type="text" name="productName" required />
      </div>
      <div class="form-group">
        <label>Üretim Fabrikası</label>
        <select name="factoryId" required>
          ${state.factories.map((factory) => `<option value="${factory.id}">${factory.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Ürün Grupları</label>
        <input type="text" name="productGroups" placeholder="Virgülle ayırın" />
      </div>
      <div class="form-actions">
        <button type="button" class="btn ghost" id="modal-cancel">Vazgeç</button>
        <button type="submit" class="btn primary">Kaydet</button>
      </div>
    `;
  } else if (type === 'role') {
    title.textContent = 'Rol Yönetimi';
    form.innerHTML = `
      <p class="form-hint">Yalnızca yöneticiler kullanıcı rolleri üzerinde değişiklik yapabilir.</p>
      <div class="form-grid role-grid">
        ${state.users
          .map(
            (user) => `
              <div class="form-group">
                <label>${user.name}</label>
                <select name="role-${user.id}">
                  ${createRoleOptions(user.roleId)}
                </select>
              </div>
            `
          )
          .join('')}
      </div>
      <div class="form-actions">
        <button type="button" class="btn ghost" id="modal-cancel">Vazgeç</button>
        <button type="submit" class="btn primary">Kaydet</button>
      </div>
    `;
  }

  form.onsubmit = handleModalSubmit;
  const cancelButton = form.querySelector('#modal-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', closeModal, { once: true });
  }
  if (type === 'order') {
    initializeOrderFormProducts(form);
    initializeOrderFormLocations(form);
  }
  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  const form = document.getElementById('modal-form');
  form.innerHTML = '';
  form.onsubmit = null;
  modalState.type = null;
}

function initializeOrderFormProducts(form) {
  const rowsContainer = form.querySelector('[data-product-rows]');
  const addButton = form.querySelector('[data-action="add-product-row"]');

  if (!rowsContainer || !addButton) {
    return;
  }

  if (state.productCatalog.length === 0) {
    const message = document.createElement('p');
    message.className = 'form-hint';
    message.textContent = 'Sipariş oluşturabilmek için önce ürün kaydı ekleyin.';
    rowsContainer.appendChild(message);
    addButton.disabled = true;
    return;
  }

  const optionsMarkup = state.productCatalog
    .map((product) => `<option value="${product.code}">${product.name} (${product.code})</option>`)
    .join('');

  const addRow = (prefill) => {
    const row = document.createElement('div');
    row.className = 'product-row';
    row.innerHTML = `
      <div class="product-row-fields">
        <label class="sr-only">Ürün</label>
        <select name="productCode[]" required></select>
        <label class="sr-only">Miktar</label>
        <input type="number" name="productQty[]" min="1" step="1" value="${prefill?.qty ?? 1}" required aria-label="Miktar" />
        <span class="product-origin" data-origin>Üretim: -</span>
      </div>
      <button type="button" class="icon-btn remove" data-action="remove-product-row" aria-label="Ürün satırını kaldır">×</button>
    `;

    const select = row.querySelector('select');
    const originLabel = row.querySelector('[data-origin]');
    select.innerHTML = optionsMarkup;

    const defaultCode = prefill?.code ?? state.productCatalog[0]?.code ?? '';
    if (defaultCode) {
      select.value = defaultCode;
    }

    const updateOrigin = () => {
      const selected = state.productCatalog.find((product) => product.code === select.value);
      const originName = selected ? getFactoryNameById(selected.factoryId) : '';
      originLabel.textContent = `Üretim: ${originName || '-'}`;
    };

    select.addEventListener('change', updateOrigin);
    updateOrigin();

    rowsContainer.appendChild(row);
  };

  addButton.addEventListener('click', () => {
    addRow();
  });

  rowsContainer.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'remove-product-row') {
      const row = event.target.closest('.product-row');
      if (row && rowsContainer.children.length > 1) {
        row.remove();
      }
    }
  });

  addRow();
}

function initializeOrderFormLocations(form) {
  const routeSelect = form.querySelector('[data-route-select]');
  const startFactorySelect = form.querySelector('[data-start-factory]');
  const consolidationFactorySelect = form.querySelector('[data-consolidation-factory]');
  const consolidationGroup = form.querySelector('[data-consolidation-group]');
  const consolidationProvinceGroup = form.querySelector('[data-consolidation-province-group]');
  const consolidationProvinceSelect = form.querySelector('[data-consolidation-province]');
  const startProvinceSelect = form.querySelector('[data-start-province]');
  const finalProvinceSelect = form.querySelector('[data-final-province]');

  const updateConsolidationVisibility = () => {
    const isMergeRoute = routeSelect?.value === 'Birleştirme';
    if (consolidationGroup) {
      consolidationGroup.classList.toggle('hidden', !isMergeRoute);
    }
    if (consolidationProvinceGroup) {
      consolidationProvinceGroup.classList.toggle('hidden', !isMergeRoute);
    }
    if (consolidationFactorySelect) {
      consolidationFactorySelect.disabled = !isMergeRoute;
      if (!isMergeRoute) {
        consolidationFactorySelect.value = '';
      }
    }
    if (consolidationProvinceSelect) {
      consolidationProvinceSelect.required = Boolean(isMergeRoute);
      consolidationProvinceSelect.disabled = !isMergeRoute;
      if (!isMergeRoute) {
        consolidationProvinceSelect.value = '';
      }
    }
  };

  const syncStartProvince = () => {
    if (!startFactorySelect || !startProvinceSelect) {
      return;
    }
    const factory = state.factories.find((item) => item.id === startFactorySelect.value);
    if (!factory) {
      return;
    }
    const optionExists = Array.from(startProvinceSelect.options).some(
      (option) => option.value === factory.city
    );
    if (optionExists) {
      startProvinceSelect.value = factory.city;
    }
  };

  const ensureFinalProvince = () => {
    if (!finalProvinceSelect) {
      return;
    }
    if (!finalProvinceSelect.value && finalProvinceSelect.options.length > 0) {
      finalProvinceSelect.selectedIndex = 0;
    }
  };

  if (routeSelect) {
    routeSelect.addEventListener('change', updateConsolidationVisibility);
  }

  if (startFactorySelect) {
    startFactorySelect.addEventListener('change', syncStartProvince);
  }

  updateConsolidationVisibility();
  syncStartProvince();
  ensureFinalProvince();
}

function handleModalSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  let success = false;

  if (modalState.type === 'order') {
    success = addOrderFromForm(formData);
  } else if (modalState.type === 'product') {
    success = addProductFromForm(formData);
  } else if (modalState.type === 'role') {
    success = updateRolesFromForm(formData);
  }

  if (success) {
    closeModal();
    renderAll();
  }
}

function addOrderFromForm(formData) {
  const orderDate = formatNow();
  const invoiceNumberInput = (formData.get('invoiceNumber') || '').toString().trim();
  const invoiceNumber = invoiceNumberInput || generateInvoiceNumber();
  const duplicateInvoice =
    state.orders.some((order) => order.invoiceNumber === invoiceNumber) ||
    state.archivedOrders.some((order) => order.invoiceNumber === invoiceNumber);
  if (duplicateInvoice) {
    window.alert('Bu fatura numarasıyla kayıtlı bir sipariş zaten mevcut.');
    return false;
  }
  const type = formData.get('orderType');
  const routeType = formData.get('routeType');
  const accountName = formData.get('accountName');
  const startFactory = state.factories.find((factory) => factory.id === formData.get('startFactory'));
  const consolidationFactoryId = formData.get('consolidationFactory');
  const consolidationFactory = routeType === 'Birleştirme' && consolidationFactoryId
    ? state.factories.find((factory) => factory.id === consolidationFactoryId)
    : null;
  const startProvince = (formData.get('startProvince') || '').trim();
  const consolidationProvinceInput = (formData.get('consolidationProvince') || '').trim();
  const finalProvince = (formData.get('finalProvince') || '').trim();
  const finalDestinationInput = (formData.get('finalDestination') || '').trim();
  const estimatedDeliveryInput = formData.get('estimatedDelivery');
  const note = formData.get('note') || '';

  if (!startFactory) {
    window.alert('Çıkış fabrikasını seçmelisiniz.');
    return false;
  }

  if (!startProvince || !finalProvince) {
    window.alert('Çıkış ve son durak illerini seçmelisiniz.');
    return false;
  }

  if (routeType === 'Birleştirme' && !consolidationFactoryId) {
    window.alert('Birleştirme hatlarında birleştirme fabrikasını seçmelisiniz.');
    return false;
  }

  const isMergeRoute = Boolean(routeType === 'Birleştirme' && consolidationFactory);

  if (isMergeRoute && !consolidationProvinceInput) {
    window.alert('Birleştirme güzergahı için birleştirme ilini seçmelisiniz.');
    return false;
  }

  const productCodes = formData.getAll('productCode[]');
  const productQuantities = formData.getAll('productQty[]');

  const products = productCodes
    .map((code, index) => {
      const trimmedCode = typeof code === 'string' ? code.trim() : '';
      if (!trimmedCode) {
        return null;
      }
      const quantityValue = Number(productQuantities[index] ?? 0);
      if (!Number.isFinite(quantityValue) || quantityValue <= 0) {
        return null;
      }
      const catalogProduct = state.productCatalog.find((item) => item.code === trimmedCode);
      const originName = catalogProduct ? getFactoryNameById(catalogProduct.factoryId) : '-';

      return {
        code: trimmedCode,
        name: catalogProduct?.name ?? 'Tanımsız Ürün',
        qty: quantityValue,
        origin: originName || '-'
      };
    })
    .filter(Boolean);

  if (products.length === 0) {
    window.alert('Siparişe en az bir ürün eklemelisiniz.');
    return false;
  }

  const timeline = calculateEstimatedTimeline(orderDate, routeType, isMergeRoute);
  const computedEstimatedDelivery = estimatedDeliveryInput
    ? formatDateFromInput(estimatedDeliveryInput)
    : timeline.final;

  const finalDestination = finalDestinationInput || finalProvince;

  const newOrderId = generateOrderId(invoiceNumber);
  const consolidationLabel = consolidationFactory?.name ?? consolidationProvinceInput;
  const finalLabel = finalDestination || finalProvince;
  const startLabel = startFactory?.name ?? startProvince;

  const newOrder = {
    id: newOrderId,
    revisionOf: getBaseOrderId(newOrderId),
    orderDate,
    invoiceNumber,
    type,
    routeType,
    accountName,
    currentLocation: startLabel,
    nextLocation: isMergeRoute ? consolidationLabel : finalLabel,
    estimatedDelivery: computedEstimatedDelivery || timeline.final || '- Tahmini bekleniyor -',
    lastUpdate: orderDate,
    finalDestination: finalLabel || '-',
    statusHistory: [],
    products,
    stages: [],
    consolidationPoint: isMergeRoute ? consolidationLabel : null
  };

  newOrder.statusHistory.push({
    timestamp: orderDate,
    note: `${startLabel}: Sipariş oluşturuldu.`
  });

  const timelineSegments = [];
  if (timeline.firstLeg?.arrival) {
    const firstStopLabel = isMergeRoute ? consolidationLabel : finalLabel;
    timelineSegments.push(`${startProvince || startLabel} → ${firstStopLabel} ${extractDate(timeline.firstLeg.arrival)}`);
  }
  if (timeline.secondLeg?.arrival) {
    timelineSegments.push(`${consolidationProvinceInput || consolidationLabel} → ${finalProvince || finalLabel} ${extractDate(timeline.secondLeg.arrival)}`);
  }
  if (timelineSegments.length > 0) {
    newOrder.statusHistory.push({
      timestamp: orderDate,
      note: `Termin Planı: ${timelineSegments.join(' • ')}`
    });
  }

  const firstStage = {
    id: `${newOrderId}-1`,
    from: startLabel || 'Belirtilmedi',
    to: isMergeRoute ? consolidationLabel : finalLabel,
    plannedStart: extractDate(timeline.firstLeg?.start ?? orderDate),
    plannedArrival: extractDate(timeline.firstLeg?.arrival ?? computedEstimatedDelivery ?? orderDate),
    transport: 'Tır',
    note: note || 'Yeni sevkiyat planı oluşturuldu.',
    responsible: `${startLabel || 'Fabrika'} Lojistik`,
    progress: 0,
    status: stageStatuses[0],
    completed: false
  };
  newOrder.stages.push(firstStage);

  if (isMergeRoute) {
    const secondStage = {
      id: `${newOrderId}-2`,
      from: consolidationLabel || 'Birleştirme Noktası',
      to: finalLabel,
      plannedStart: extractDate(timeline.secondLeg?.start ?? timeline.firstLeg?.arrival ?? orderDate),
      plannedArrival: extractDate(timeline.secondLeg?.arrival ?? computedEstimatedDelivery ?? orderDate),
      transport: 'Tır',
      note: 'Birleştirme sonrası sevkiyat.',
      responsible: `${consolidationLabel || 'Birleştirme'} Sevkiyat`,
      progress: 0,
      status: stageStatuses[0],
      completed: false
    };
    newOrder.stages.push(secondStage);
  }

  prepareStageData(newOrder);
  updateOrderFlow(newOrder);
  state.orders.unshift(newOrder);
  state.activeOrderId = newOrder.id;
  return true;
}

function addProductFromForm(formData) {
  const code = formData.get('productCode');
  const name = formData.get('productName');
  const factoryId = formData.get('factoryId');
  const groupsInput = formData.get('productGroups') || '';
  const groups = groupsInput
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  state.productCatalog.unshift({ code, name, factoryId, groups: groups.length ? groups : ['Tanımsız Grup'] });
  return true;
}

function updateRolesFromForm(formData) {
  if (!userHasPermission('manageRoles')) {
    window.alert('Rol değişiklikleri yalnızca yöneticiler tarafından yapılabilir.');
    return false;
  }

  state.users.forEach((user) => {
    const selectedRoleId = formData.get(`role-${user.id}`);
    if (selectedRoleId && roleDefinitions[selectedRoleId]) {
      user.roleId = selectedRoleId;
    }
  });

  updateUserArea();
  return true;
}

function deleteActiveOrder() {
  if (!state.activeOrderId) {
    window.alert('Silinecek sipariş bulunamadı.');
    return;
  }

  const confirmation = window.confirm('Seçili siparişi silmek istediğinize emin misiniz?');
  if (!confirmation) {
    return;
  }

  const index = state.orders.findIndex((order) => order.id === state.activeOrderId);
  if (index > -1) {
    state.orders.splice(index, 1);
    state.activeOrderId = state.orders[0]?.id ?? null;
    renderAll();
  }
}

function advanceStage(orderId, stageId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    return;
  }
  const stage = order.stages.find((item) => item.id === stageId);
  if (!stage) {
    return;
  }

  const nextProgress = Math.min(stage.progress + 1, stageStatuses.length - 1);
  if (nextProgress === stage.progress) {
    return;
  }

  const outgoingAllowed = canManageOutgoingStage(stage);
  const incomingAllowed = canManageIncomingStage(stage);
  const canCompleteFromSource = outgoingAllowed && !incomingAllowed && !isKnownFactoryLocation(stage.to);

  if (nextProgress <= 2 && !outgoingAllowed) {
    window.alert('Bu aşama yalnızca ilgili üretim fabrikası tarafından ilerletilebilir.');
    return;
  }

  if (nextProgress === 3 && !(incomingAllowed || canCompleteFromSource)) {
    window.alert('Sevkiyat tamamlaması ilgili varış noktası tarafından onaylanmalıdır.');
    return;
  }

  const { orderCompleted, timestamp } = setStageProgress(order, stage, nextProgress);

  const note = progressNote(stage, nextProgress);
  if (note) {
    addHistory(order, note);
  }

  if (orderCompleted) {
    archiveOrder(order, timestamp);
    renderAll();
    return;
  }

  updateOrderFlow(order);
  renderAll();
}

function dispatchStage(orderId, stageId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    return false;
  }
  const stage = order.stages.find((item) => item.id === stageId);
  if (!stage) {
    return false;
  }

  if (!canManageOutgoingStage(stage)) {
    window.alert('Bu sevkiyat çıkışı farklı bir fabrikanın kontrolündedir.');
    return false;
  }

  if (stage.progress >= 2) {
    return false;
  }

  if (stage.progress !== 1) {
    window.alert('Sevkiyat çıkışı için aşama "Hazırlanıyor" durumunda olmalıdır.');
    return false;
  }

  if (!isStageDispatchReady(stage)) {
    window.alert('Sevkiyat çıkışı için ürün kontrolleri ve ambar onayı tamamlanmalıdır.');
    return false;
  }

  const shortageItems = Array.isArray(stage.lineItems)
    ? stage.lineItems
        .filter((item) => item?.isLocal !== false)
        .filter((item) => Number(item.missingQty) > 0)
        .map((item) => ({
          code: item.productCode,
          name: item.productName,
          qty: Number(item.missingQty) || 0,
          origin: item.origin
        }))
    : [];

  if (shortageItems.length > 0) {
    stage.shortages = stage.shortages || [];
    stage.shortages.push({ timestamp: formatNow(), items: shortageItems });
    stage.shortageFlagged = true;
    const summary = shortageItems.map((item) => `${item.code} x${item.qty}`).join(', ');
    addHistory(order, `${stage.from}: Eksik ürün bildirimi - ${summary}`);
    const revisionOrder = createShortageOrder(order, stage, shortageItems);
    addHistory(order, `${stage.from}: Eksik ürünler için ${revisionOrder.id} revizyonu açıldı.`);
    window.alert('Eksik ürünler için yeni bir revizyon siparişi oluşturuldu.');
  }

  if (Array.isArray(stage.lineItems)) {
    stage.lineItems.forEach((item) => {
      const qty = Number(item.qty) || 0;
      if (item?.isLocal === false) {
        item.readyQty = qty;
        item.missingQty = 0;
        return;
      }
      item.readyQty = clamp(item.readyQty, 0, qty);
      item.missingQty = clamp(item.missingQty, 0, qty);
    });
  }

  const { orderCompleted, timestamp } = setStageProgress(order, stage, 2);
  addHistory(order, `${stage.from}: Sevkiyat yola çıktı.`);

  resetStageApproval(stage);

  if (orderCompleted) {
    archiveOrder(order, timestamp);
    renderAll();
    return true;
  }

  updateOrderFlow(order);
  renderAll();
  return true;
}

function completeStage(orderId, stageId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    return;
  }
  const stage = order.stages.find((item) => item.id === stageId);
  if (!stage) {
    return;
  }

  if (!canManageIncomingStage(stage)) {
    window.alert('Bu sevkiyat girişi ilgili fabrika tarafından onaylanmalıdır.');
    renderHatManagement();
    return;
  }

  if (stage.progress >= 3) {
    return;
  }

  const { orderCompleted, timestamp } = setStageProgress(order, stage, 3);
  addHistory(order, `${stage.to}: Giriş onayı verildi.`);

  if (orderCompleted) {
    archiveOrder(order, timestamp);
    renderAll();
    return;
  }

  updateOrderFlow(order);
  renderAll();
}

function dispatchAllFromWarehouse() {
  const activeWarehouse = state.activeWarehouse;
  const stagesToDispatch = [];

  state.orders.forEach((order) => {
    order.stages.forEach((stage) => {
      if (stage.from === activeWarehouse && stage.progress < 2) {
        stagesToDispatch.push({ orderId: order.id, stageId: stage.id });
      }
    });
  });

  const readyStages = stagesToDispatch.filter(({ orderId, stageId }) => {
    const order = state.orders.find((item) => item.id === orderId);
    const stage = order?.stages.find((item) => item.id === stageId);
    if (!stage) {
      return false;
    }
    if (!canManageOutgoingStage(stage) || stage.progress !== 1) {
      return false;
    }
    return isStageDispatchReady(stage);
  });

  if (readyStages.length === 0) {
    window.alert('Çıkış için onaylanmış sevkiyat bulunmuyor.');
    return;
  }

  let dispatchedAny = false;
  readyStages.forEach(({ orderId, stageId }) => {
    dispatchedAny = dispatchStage(orderId, stageId) || dispatchedAny;
  });

  if (!dispatchedAny) {
    window.alert('Onaylı sevkiyat bulunamadı.');
  }
}

function reportStageShortage(orderId, stageId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    return;
  }
  const stage = order.stages.find((item) => item.id === stageId);
  if (!stage) {
    return;
  }

  if (!canManageIncomingStage(stage)) {
    window.alert('Eksik ürün bildirimi yalnızca ilgili varış ambarı tarafından yapılabilir.');
    renderHatManagement();
    return;
  }

  const manageableItems = getManageableLineItemsForWarehouse(stage, state.activeWarehouse);
  if (manageableItems.length === 0) {
    window.alert('Bu sevkiyat için eksik ürün bildirimi yapılamaz. Ürün üretimi farklı fabrikada.');
    return;
  }

  if (stage.shortageFlagged) {
    window.alert('Bu sevkiyat için eksik ürün bildirimi zaten yapılmış.');
    return;
  }

  const input = window.prompt(
    'Eksik ürünleri Kod:Adet formatında girin. Örnek: MET-001:10, PVC-063:5'
  );
  if (!input) {
    return;
  }

  const shortageItems = parseShortageInput(input, order.products);
  if (shortageItems.length === 0) {
    window.alert('Eksik ürün bilgisi okunamadı. Kod:Adet formatını kullanın.');
    return;
  }

  const allowedCodes = new Set(
    manageableItems.map((item) => item.productCode.toUpperCase())
  );
  const filteredShortages = shortageItems.filter((item) =>
    allowedCodes.has(item.code.toUpperCase())
  );

  if (filteredShortages.length === 0) {
    window.alert('Girdiğiniz ürünler bu fabrikanın üretiminde değil. Eksik bildirimine eklenmedi.');
    return;
  }

  if (filteredShortages.length < shortageItems.length) {
    window.alert('Üretim sorumluluğunuz dışındaki ürünler eksik listesine eklenmedi.');
  }

  stage.shortageFlagged = true;
  stage.shortages = stage.shortages || [];
  stage.shortages.push({ timestamp: formatNow(), items: filteredShortages });

  const summary = filteredShortages.map((item) => `${item.code} x${item.qty}`).join(', ');
  addHistory(order, `${stage.to}: Eksik ürün bildirimi - ${summary}`);

  const revisionOrder = createShortageOrder(order, stage, filteredShortages);
  addHistory(order, `${stage.to}: Eksik ürünler için ${revisionOrder.id} revizyonu açıldı.`);

  window.alert('Eksik ürünler için yeni bir revizyon siparişi oluşturuldu.');
  renderAll();
}

function parseShortageInput(input, products) {
  if (!input) {
    return [];
  }
  return input
    .split(',')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [codePart, qtyPart] = chunk.split(':').map((part) => part.trim());
      if (!codePart || !qtyPart) {
        return null;
      }
      const normalizedCode = codePart.toUpperCase();
      const quantity = Number(qtyPart.replace(',', '.'));
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return null;
      }
      const matchedProduct = products.find(
        (product) => product.code.toUpperCase() === normalizedCode
      );
      return {
        code: matchedProduct?.code ?? normalizedCode,
        name: matchedProduct?.name ?? 'Tanımsız Ürün',
        qty: quantity,
        origin: matchedProduct?.origin ?? '-'
      };
    })
    .filter(Boolean);
}

function createShortageOrder(order, stage, shortageItems) {
  const baseOrderId = order.revisionOf ?? getBaseOrderId(order.id);
  order.revisionOf = baseOrderId;
  const revisionId = generateRevisionId(order.id);
  const now = formatNow();
  const hasConsolidation = order.stages.length > 1;
  const timeline = calculateEstimatedTimeline(now, order.routeType, hasConsolidation);

  const stageIndex = order.stages.findIndex((item) => item.id === stage.id);
  const targetStage = stageIndex > -1 ? order.stages[stageIndex] : stage;
  const originLabel = targetStage?.from ?? order.currentLocation;
  const destinationLabel = targetStage?.to ?? order.nextLocation;
  const orderFinal = order.finalDestination || order.stages[order.stages.length - 1]?.to;
  const isFinalStage = stageIndex === order.stages.length - 1;
  const legTimeline = stageIndex > 0 && hasConsolidation ? timeline.secondLeg ?? timeline.firstLeg : timeline.firstLeg;

  const revisionOrder = {
    id: revisionId,
    revisionOf: baseOrderId,
    orderDate: now,
    invoiceNumber: generateInvoiceNumber(),
    type: order.type,
    routeType: order.routeType,
    accountName: order.accountName,
    currentLocation: originLabel,
    nextLocation: destinationLabel,
    estimatedDelivery: legTimeline?.arrival ?? timeline.final ?? order.estimatedDelivery,
    lastUpdate: now,
    finalDestination: isFinalStage ? orderFinal : destinationLabel,
    statusHistory: [],
    products: shortageItems.map((item) => ({
      code: item.code,
      name: item.name,
      qty: item.qty,
      origin: item.origin
    })),
    stages: []
  };

  revisionOrder.statusHistory.push({
    timestamp: now,
    note: `${originLabel}: Revizyon siparişi oluşturuldu.`
  });

  const timelineSegments = [];
  if (legTimeline?.arrival) {
    timelineSegments.push(
      `${originLabel} → ${destinationLabel} ${extractDate(legTimeline.arrival)}`
    );
  }
  if (timelineSegments.length > 0) {
    revisionOrder.statusHistory.push({
      timestamp: now,
      note: `Termin Planı: ${timelineSegments.join(' • ')}`
    });
  }

  revisionOrder.statusHistory.push({
    timestamp: now,
    note: `Eksik ürün listesi: ${shortageItems
      .map((item) => `${item.code} x${item.qty}`)
      .join(', ')}`
  });

  const stagePlans = [
    {
      id: `${revisionId}-1`,
      from: originLabel,
      to: destinationLabel,
      plannedStart: extractDate(legTimeline?.start ?? now),
      plannedArrival: extractDate(legTimeline?.arrival ?? timeline.final ?? now),
      transport: targetStage?.transport ?? 'Tır',
      note: `${targetStage?.note ?? 'Eksik ürün sevkiyatı.'} (Eksik ürün)`,
      responsible: targetStage?.responsible ?? `${originLabel} Lojistik`,
      progress: 0,
      status: stageStatuses[0],
      completed: false
    }
  ];

  revisionOrder.stages = stagePlans;

  prepareStageData(revisionOrder);
  updateOrderFlow(revisionOrder);
  state.orders.unshift(revisionOrder);
  state.activeOrderId = revisionOrder.id;
  return revisionOrder;
}

function setStageProgress(order, stage, progress) {
  stage.progress = progress;
  stage.status = stageStatuses[progress];
  stage.completed = progress >= stageStatuses.length - 1;
  const timestamp = formatNow();
  order.lastUpdate = timestamp;
  updateWarehouseReceipts(order, stage, timestamp);
  const orderCompleted = order.stages.every((item) => item.completed);
  return { timestamp, orderCompleted };
}

function progressNote(stage, progress) {
  switch (progress) {
    case 1:
      return `${stage.from}: Yükleme hazırlığı başladı.`;
    case 2:
      return `${stage.from}: Sevkiyat yola çıktı.`;
    case 3:
      return `${stage.to}: Sevk tamamlandı.`;
    default:
      return '';
  }
}

function addHistory(order, note) {
  order.statusHistory.push({ timestamp: formatNow(), note });
}

function updateOrderFlow(order) {
  const nextStageIndex = order.stages.findIndex((stage) => !stage.completed);
  const lastStage = order.stages[order.stages.length - 1];
  if (lastStage?.to) {
    order.finalDestination = lastStage.to;
  }
  if (nextStageIndex === -1) {
    order.currentLocation = order.stages[order.stages.length - 1]?.to ?? order.currentLocation;
    order.nextLocation = 'Sipariş teslim edildi';
  } else {
    const previousStage = order.stages[nextStageIndex - 1];
    order.currentLocation = previousStage ? previousStage.to : order.stages[nextStageIndex].from;
    order.nextLocation = order.stages[nextStageIndex].to;
  }
}

function updateWarehouseReceipts(order, stage, deliveredTimestamp = null) {
  if (!stage) {
    return;
  }

  const destination = stage.to;
  const isFactoryDestination = state.factories.some((factory) => factory.name === destination);

  if (!destination || !isFactoryDestination || !stage.completed) {
    removeStageReceipt(stage.id);
    return;
  }

  if (!state.warehouseReceipts[destination]) {
    state.warehouseReceipts[destination] = [];
  }

  const receipts = state.warehouseReceipts[destination];
  const existingIndex = receipts.findIndex((receipt) => receipt.stageId === stage.id);
  const existingReceipt = existingIndex > -1 ? receipts[existingIndex] : null;
  const deliveredAt = existingReceipt?.deliveredAt ?? deliveredTimestamp ?? formatNow();

  const payload = {
    stageId: stage.id,
    orderId: order.id,
    deliveredAt,
    from: stage.from,
    note: stage.note,
    accountName: order.accountName
  };

  if (existingIndex === -1) {
    receipts.unshift(payload);
  } else {
    receipts[existingIndex] = { ...existingReceipt, ...payload };
  }
}

function archiveOrder(order, deliveredAt) {
  if (!order) {
    return;
  }

  const archiveEntry = {
    id: order.id,
    orderDate: order.orderDate,
    invoiceNumber: order.invoiceNumber,
    type: order.type,
    routeType: order.routeType,
    accountName: order.accountName,
    deliveredAt: deliveredAt ?? formatNow()
  };

  if (order.finalDestination) {
    archiveEntry.finalDestination = order.finalDestination;
  }

  state.archivedOrders.unshift(archiveEntry);
  order.stages.forEach((stage) => removeStageReceipt(stage.id));

  const index = state.orders.findIndex((item) => item.id === order.id);
  if (index > -1) {
    state.orders.splice(index, 1);
  }

  if (state.activeOrderId === order.id) {
    state.activeOrderId = state.orders[0]?.id ?? null;
  }
}

function removeStageReceipt(stageId) {
  Object.keys(state.warehouseReceipts).forEach((key) => {
    const list = state.warehouseReceipts[key];
    if (!Array.isArray(list)) {
      return;
    }
    const index = list.findIndex((item) => item.stageId === stageId);
    if (index > -1) {
      list.splice(index, 1);
    }
  });
}

function getBaseOrderId(orderId) {
  return orderId.replace(/-REV\d+$/, '');
}

function generateRevisionId(orderId) {
  const baseId = getBaseOrderId(orderId);
  let highest = 0;
  state.orders.forEach((item) => {
    const candidateBase = getBaseOrderId(item.id);
    if (candidateBase !== baseId) {
      return;
    }
    const match = item.id.match(/-REV(\d+)$/);
    if (match) {
      highest = Math.max(highest, Number(match[1]));
    } else if (item.id === baseId) {
      highest = Math.max(highest, 0);
    }
  });
  return `${baseId}-REV${highest + 1}`;
}

function formatDateFromInput(input) {
  if (!input) {
    return '';
  }
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return input;
  }
  return formatDisplayDate(date);
}

function toDateTimeLocalValue(displayValue) {
  if (!displayValue) {
    return '';
  }

  const [datePart, timePart] = displayValue.trim().split(' ');
  if (!datePart) {
    return '';
  }

  const dateMatch = datePart.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!dateMatch) {
    return '';
  }

  const [, day, month, year] = dateMatch;

  let hour = '00';
  let minute = '00';
  if (timePart) {
    const timeMatch = timePart.match(/^(\d{1,2}):(\d{1,2})$/);
    if (timeMatch) {
      hour = timeMatch[1].padStart(2, '0');
      minute = timeMatch[2].padStart(2, '0');
    }
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour}:${minute}`;
}

function extractDate(dateString) {
  return dateString?.split(' ')[0] ?? '';
}

function parseDisplayDate(displayValue) {
  if (!displayValue) {
    return null;
  }
  const [datePart, timePart] = displayValue.split(' ');
  if (!datePart) {
    return null;
  }
  const [day, month, year] = datePart.split('.').map(Number);
  if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year)) {
    return null;
  }
  let hour = 0;
  let minute = 0;
  if (timePart) {
    const [hourPart, minutePart] = timePart.split(':').map(Number);
    if (Number.isFinite(hourPart)) {
      hour = hourPart;
    }
    if (Number.isFinite(minutePart)) {
      minute = minutePart;
    }
  }
  const date = new Date(year, month - 1, day, hour, minute);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
}

function addDays(date, days) {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

function calculateEstimatedTimeline(orderDate, routeType, hasConsolidation) {
  const baseDate = parseDisplayDate(orderDate) ?? new Date();
  const profiles = {
    Direkt: { firstLeg: 5, buffer: 0, secondLeg: 0 },
    Bölge: { firstLeg: 4, buffer: 0, secondLeg: 0 },
    Birleştirme: { firstLeg: 3, buffer: 1, secondLeg: 4 }
  };
  const profile = profiles[routeType] ?? profiles.Direkt;

  const firstLegDays = Number.isFinite(profile.firstLeg) ? profile.firstLeg : 5;
  const bufferDays = hasConsolidation ? (Number.isFinite(profile.buffer) ? profile.buffer : 1) : 0;
  const secondLegDays = hasConsolidation ? (Number.isFinite(profile.secondLeg) ? profile.secondLeg : 4) : 0;

  const firstLegStartDate = baseDate;
  const firstLegArrivalDate = addDays(firstLegStartDate, firstLegDays);

  const timeline = {
    firstLeg: {
      start: formatDisplayDate(firstLegStartDate),
      arrival: formatDisplayDate(firstLegArrivalDate)
    },
    secondLeg: null,
    final: ''
  };

  if (hasConsolidation) {
    const secondLegStartDate = addDays(firstLegArrivalDate, bufferDays);
    const secondLegArrivalDate = addDays(secondLegStartDate, secondLegDays);
    timeline.secondLeg = {
      start: formatDisplayDate(secondLegStartDate),
      arrival: formatDisplayDate(secondLegArrivalDate)
    };
    timeline.final = formatDisplayDate(secondLegArrivalDate);
  } else {
    timeline.final = formatDisplayDate(firstLegArrivalDate);
  }

  return timeline;
}

function formatDisplayDate(date) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
    .format(date)
    .replace(',', '');
}

function formatNow() {
  return formatDisplayDate(new Date());
}

function generateOrderId(invoiceNumber) {
  const normalized = (invoiceNumber ?? '')
    .toString()
    .trim();
  if (!normalized) {
    return `ORD-${Date.now()}`;
  }
  return `ORD-${normalized}`;
}

function generateInvoiceNumber() {
  return String(Math.floor(Math.random() * 900000) + 100000);
}
