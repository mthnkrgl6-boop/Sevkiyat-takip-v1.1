const roleDefinitions = {
  'satis-operasyon': {
    name: 'Satış Operasyon',
    permissions: { addOrder: true, manageRoles: false, manageProducts: false }
  },
  'ambar-sorumlusu': {
    name: 'Ambar Sorumlusu',
    permissions: { addOrder: false, manageRoles: false, manageProducts: false }
  },
  yonetici: {
    name: 'Yönetici',
    permissions: { addOrder: true, manageRoles: true, manageProducts: true }
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

const defaultFactories = [
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

const warehouseDisplayNames = {
  'İstanbul Şirin Fabrika': 'Şirin',
  'Aksaray Merkez Fabrika': 'Aksaray',
  'Aksaray Altyapı Fabrika': 'Aksaray Altyapı'
};
const defaultProductCatalog = [
  { code: 'MET-001', name: 'Galvaniz Dirsek', factoryId: 'istanbul-sirin', groups: ['Metal Ürünler'] },
  { code: 'PPR-110', name: 'PPRC Boru 110mm', factoryId: 'aksaray-merkez', groups: ['PPRC Borular'] },
  { code: 'PVC-063', name: 'PVC Boru 63mm', factoryId: 'sakarya', groups: ['PVC Borular'] },
  { code: 'RAD-500', name: 'Panel Radyatör 500/1000', factoryId: 'denizli', groups: ['Radyatör'] },
  { code: 'FLEX-PEX', name: 'Flex Hortum Seti', factoryId: 'denizli', groups: ['Flex Ürünler'] },
  { code: 'SESSIZ-100', name: 'Sessiz Boru DN100', factoryId: 'aksaray-merkez', groups: ['Sessiz Boru'] },
  { code: 'KRG-400', name: 'Koruge Boru 400mm', factoryId: 'aksaray-altyapi', groups: ['Koruge'] },
  { code: 'PE100-225', name: 'PE100 Basınçlı Hat 225mm', factoryId: 'aksaray-altyapi', groups: ['PE100 Hatları'] }
];

const STORAGE_KEY = 'kalde-shipment-state-v2';

const storageAvailable = (() => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const testKey = '__kalde_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
})();

function cloneFactories(list) {
  return (list || []).map((factory) => ({
    ...factory,
    productGroups: Array.isArray(factory.productGroups) ? factory.productGroups.slice() : []
  }));
}

function cloneProductCatalog(list) {
  return (list || []).map((product) => ({
    ...product,
    groups: Array.isArray(product.groups) ? product.groups.slice() : []
  }));
}

function cloneUsers(list) {
  return (list || []).map((user, index) => ({
    id: user?.id ?? `user-${index + 1}`,
    name: user?.name ?? `Kullanıcı ${index + 1}`,
    email: user?.email ?? '',
    password: user?.password ?? '',
    roleId: user?.roleId ?? 'satis-operasyon',
    responsibleFactories: Array.isArray(user?.responsibleFactories)
      ? user.responsibleFactories.slice()
      : [],
    lastWarehouse: user?.lastWarehouse ?? null
  }));
}

function createDefaultState() {
  const factories = cloneFactories(defaultFactories);
  const productCatalog = cloneProductCatalog(defaultProductCatalog);
  const managerUser = {
    id: 'user-1',
    name: 'Metehan Kargili',
    email: 'metehankargili@kaldeboru.com',
    password: '123',
    roleId: 'yonetici',
    responsibleFactories: factories.map((factory) => factory.name),
    lastWarehouse: factories[0]?.name ?? null
  };

  return {
    factories,
    users: [managerUser],
    session: {
      isAuthenticated: false,
      loginAt: null
    },
    activeUserId: null,
    orders: [],
    archivedOrders: [],
    productCatalog,
    activeTab: 'siparisler',
    activeOrderId: null,
    activeWarehouse: factories[0]?.name ?? '',
    warehouseReceipts: {},
    modalType: null
  };
}

function sanitizeUsers(persistedUsers, factories, fallbackUsers) {
  if (!Array.isArray(persistedUsers)) {
    return cloneUsers(fallbackUsers);
  }

  const knownFactories = new Set(factories.map((factory) => factory.name));
  const validRoleIds = Object.keys(roleDefinitions);

  const sanitized = persistedUsers
    .map((user, index) => {
      if (!user || typeof user !== 'object') {
        return null;
      }
      const id = typeof user.id === 'string' && user.id.trim() ? user.id.trim() : `user-${index + 1}`;
      const email = typeof user.email === 'string' ? user.email.trim() : '';
      const password = typeof user.password === 'string' ? user.password : '';
      if (!email || !password) {
        return null;
      }
      const name = typeof user.name === 'string' && user.name.trim() ? user.name.trim() : email;
      const roleId = validRoleIds.includes(user.roleId) ? user.roleId : 'satis-operasyon';
      const responsibleFactories = Array.isArray(user.responsibleFactories)
        ? user.responsibleFactories
            .map((factoryName) => (typeof factoryName === 'string' ? factoryName.trim() : ''))
            .filter((factoryName) => factoryName && knownFactories.has(factoryName))
        : [];
      const lastWarehouse =
        typeof user.lastWarehouse === 'string' && knownFactories.has(user.lastWarehouse)
          ? user.lastWarehouse
          : null;

      return {
        id,
        name,
        email,
        password,
        roleId,
        responsibleFactories,
        lastWarehouse
      };
    })
    .filter(Boolean);

  if (sanitized.length === 0) {
    return cloneUsers(fallbackUsers);
  }

  return sanitized;
}

function mergePersistedState(defaultState, persistedState) {
  if (!persistedState || typeof persistedState !== 'object') {
    return defaultState;
  }

  const merged = { ...defaultState };

  merged.factories = Array.isArray(persistedState.factories) && persistedState.factories.length > 0
    ? cloneFactories(persistedState.factories)
    : defaultState.factories;

  merged.users = sanitizeUsers(persistedState.users, merged.factories, defaultState.users);

  merged.orders = Array.isArray(persistedState.orders) ? persistedState.orders.slice() : [];
  merged.archivedOrders = Array.isArray(persistedState.archivedOrders)
    ? persistedState.archivedOrders.slice()
    : [];

  merged.productCatalog = Array.isArray(persistedState.productCatalog) && persistedState.productCatalog.length > 0
    ? cloneProductCatalog(persistedState.productCatalog)
    : defaultState.productCatalog;

  merged.session = {
    isAuthenticated: Boolean(persistedState.session?.isAuthenticated),
    loginAt:
      typeof persistedState.session?.loginAt === 'string' && persistedState.session.loginAt.trim()
        ? persistedState.session.loginAt.trim()
        : null
  };

  merged.activeUserId = merged.users.some((user) => user.id === persistedState.activeUserId)
    ? persistedState.activeUserId
    : null;

  if (!merged.activeUserId) {
    merged.session.isAuthenticated = false;
    merged.session.loginAt = null;
  }

  merged.activeWarehouse = merged.factories.some((factory) => factory.name === persistedState.activeWarehouse)
    ? persistedState.activeWarehouse
    : defaultState.activeWarehouse;

  merged.activeTab = 'siparisler';
  merged.activeOrderId = null;
  merged.warehouseReceipts = {};
  merged.modalType = null;

  return merged;
}

function loadInitialState() {
  const defaultState = createDefaultState();
  if (!storageAvailable) {
    return defaultState;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultState;
    }
    const parsed = JSON.parse(stored);
    return mergePersistedState(defaultState, parsed);
  } catch (error) {
    console.error('Kaydedilmiş sevkiyat verileri yüklenemedi:', error);
    return defaultState;
  }
}

const state = loadInitialState();

let persistTimer = null;

function persistState() {
  if (!storageAvailable || typeof window === 'undefined') {
    return;
  }

  const snapshot = {
    factories: state.factories,
    users: state.users,
    session: state.session,
    activeUserId: state.activeUserId,
    orders: state.orders,
    archivedOrders: state.archivedOrders,
    productCatalog: state.productCatalog,
    activeWarehouse: state.activeWarehouse
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.error('Sevkiyat verileri kaydedilirken hata oluştu:', error);
  }
}

if (storageAvailable && typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    persistState();
  });
}

function schedulePersist() {
  if (!storageAvailable) {
    return;
  }
  if (persistTimer !== null) {
    return;
  }
  persistTimer = setTimeout(() => {
    persistTimer = null;
    persistState();
  }, 100);
}

function getWarehouseDisplayName(factoryName) {
  if (!factoryName) {
    return '';
  }
  if (warehouseDisplayNames[factoryName]) {
    return warehouseDisplayNames[factoryName];
  }
  const factory = state.factories.find((item) => item.name === factoryName);
  if (factory?.city) {
    return factory.city;
  }
  return factoryName;
}

function buildWarehouseOptionsMarkup() {
  return state.factories
    .map((factory) => `<option value="${factory.name}">${getWarehouseDisplayName(factory.name)}</option>`)
    .join('');
}

const modalState = {
  type: null
};

function isAuthenticated() {
  return Boolean(state.session?.isAuthenticated);
}

function getActiveUser() {
  if (!state.activeUserId) {
    return null;
  }
  return state.users.find((user) => user.id === state.activeUserId) ?? null;
}

function authenticateUser(email, password) {
  if (!email || !password) {
    return null;
  }
  const normalizedEmail = email.trim().toLowerCase();
  return (
    state.users.find(
      (user) => user.email?.trim().toLowerCase() === normalizedEmail && user.password === password
    ) ?? null
  );
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateUserId() {
  const existingIds = new Set(state.users.map((user) => user.id));
  let counter = state.users.length + 1;
  let candidate = `user-${counter}`;
  while (existingIds.has(candidate)) {
    counter += 1;
    candidate = `user-${counter}`;
  }
  return candidate;
}

function defaultWarehouseForUser(user) {
  if (!user) {
    return state.factories[0]?.name ?? '';
  }
  if (user.lastWarehouse) {
    return user.lastWarehouse;
  }
  if (Array.isArray(user.responsibleFactories) && user.responsibleFactories.length > 0) {
    return user.responsibleFactories[0];
  }
  return state.factories[0]?.name ?? '';
}

function completeLogin(user) {
  state.session.isAuthenticated = true;
  state.session.loginAt = formatNow();
  state.activeUserId = user.id;
  const assignedWarehouse = defaultWarehouseForUser(user);
  state.activeWarehouse = assignedWarehouse;
  user.lastWarehouse = assignedWarehouse ?? null;
  updateUserArea();
  renderAll();
}

function performLogout() {
  state.session.isAuthenticated = false;
  state.session.loginAt = null;
  state.activeUserId = null;
  state.activeWarehouse = state.factories[0]?.name ?? '';
  const errorLabel = document.getElementById('login-error');
  if (errorLabel) {
    errorLabel.textContent = '';
  }
  updateUserArea();
  renderAll();
}

document.addEventListener('DOMContentLoaded', () => {
  initialiseOrders();
  bindNavigation();
  bindGlobalActions();
  setupWarehouseSelect();
  initializeHeaderControls();
  initializeAuth();
  renderAll();
});

function initialiseOrders() {
  state.warehouseReceipts = {};
  if (!Array.isArray(state.orders)) {
    state.orders = [];
    return;
  }

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

  if (!Array.isArray(order.stages)) {
    order.stages = [];
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

function userCanManageFactory(factoryName) {
  if (!factoryName) {
    return false;
  }
  if (!isAuthenticated()) {
    return false;
  }
  if (isManagerUser()) {
    return true;
  }
  const activeUser = getActiveUser();
  if (!activeUser) {
    return false;
  }
  const assignments = Array.isArray(activeUser.responsibleFactories)
    ? activeUser.responsibleFactories
    : [];
  return assignments.some((name) => isSameLocationName(name, factoryName));
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

function isSalesOperationUser() {
  return getActiveRoleId() === 'satis-operasyon';
}

function canDeleteOrders() {
  if (!isAuthenticated()) {
    return false;
  }
  return isManagerUser() || isSalesOperationUser();
}

function canManageOutgoingStage(stage) {
  if (!stage) {
    return false;
  }
  return userCanManageFactory(stage.from);
}

function canManageIncomingStage(stage) {
  if (!stage) {
    return false;
  }
  return userCanManageFactory(stage.to);
}

function inboundStagesCompleted(order, stage) {
  if (!order || !stage) {
    return false;
  }
  const inboundStages = order.stages.filter(
    (candidate) => candidate.id !== stage.id && isSameLocationName(candidate.to, stage.from)
  );
  if (inboundStages.length === 0) {
    return true;
  }
  return inboundStages.every((candidate) => candidate.progress >= stageStatuses.length - 1);
}

function canOperateOutgoingStage(order, stage) {
  return canManageOutgoingStage(stage) && inboundStagesCompleted(order, stage);
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
  if (!userCanManageFactory(warehouseName)) {
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

  if (!canOperateOutgoingStage(order, stage) || stage.progress >= 2) {
    const message = inboundStagesCompleted(order, stage)
      ? 'Bu aşamadaki stok hazırlığı sadece ilgili fabrika tarafından güncellenebilir.'
      : 'Sipariş giriş onayı tamamlanmadan stok hazırlığı yapılamaz.';
    window.alert(message);
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

  if (!canOperateOutgoingStage(order, stage) || stage.progress >= 2) {
    const message = inboundStagesCompleted(order, stage)
      ? 'Bu aşamadaki stok hazırlığı sadece ilgili fabrika tarafından güncellenebilir.'
      : 'Sipariş giriş onayı tamamlanmadan stok hazırlığı yapılamaz.';
    window.alert(message);
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

  if (!inboundStagesCompleted(order, stage)) {
    window.alert('Sipariş giriş onayı tamamlanmadan çıkış onayı verilemez.');
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
  document.getElementById('orders-close-btn').addEventListener('click', () => {
    state.activeOrderId = null;
    renderOrdersTable();
  });

  document.getElementById('add-order-btn').addEventListener('click', () => {
    if (!userHasPermission('addOrder')) {
      window.alert('Yeni sipariş ekleme işlemi yalnızca Satış Operasyon veya Yönetici rolleri tarafından yapılabilir.');
      return;
    }
    openModal('order');
  });
  document.getElementById('add-product-btn').addEventListener('click', () => {
    if (!isAuthenticated() || !userHasPermission('manageProducts')) {
      window.alert('Ürün ekleme işlemi yalnızca yöneticiler tarafından yapılabilir.');
      return;
    }
    openModal('product');
  });
  document.getElementById('delete-order-btn').addEventListener('click', deleteActiveOrder);
  document.getElementById('dispatch-all-btn').addEventListener('click', dispatchAllFromWarehouse);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target.id === 'modal') {
      closeModal();
    }
  });

  document.getElementById('orders-table-body').addEventListener('click', handleOrderTableClick);
  const incomingList = document.getElementById('incoming-list');
  incomingList.addEventListener('change', handleIncomingAction);
  incomingList.addEventListener('click', handleIncomingAction);
  const outgoingList = document.getElementById('outgoing-list');
  outgoingList.addEventListener('click', handleOutgoingAction);
  outgoingList.addEventListener('input', handleOutgoingAction);
  outgoingList.addEventListener('change', handleOutgoingAction);
  const productTableBody = document.getElementById('product-table-body');
  if (productTableBody) {
    productTableBody.addEventListener('change', handleProductTableChange);
    productTableBody.addEventListener('click', handleProductTableClick);
  }
}

function setupWarehouseSelect() {
  const select = document.getElementById('warehouse-select');
  if (!select) {
    return;
  }
  select.innerHTML = buildWarehouseOptionsMarkup();
  select.addEventListener('change', (event) => {
    if (!isAuthenticated() || !isManagerUser()) {
      event.target.value = state.activeWarehouse;
      return;
    }
    state.activeWarehouse = event.target.value;
    const user = getActiveUser();
    if (user) {
      user.lastWarehouse = state.activeWarehouse;
    }
    updatePermissionSensitiveUI();
    renderHatManagement();
  });
  updateWarehouseSelect();
}

function updateUserArea() {
  syncActiveWarehouse();
  updateAuthDisplay();
  updateWarehouseSelect();
  updateRoleDisplay();
  updatePermissionSensitiveUI();
  updateRoleManagementVisibility();
}

function syncActiveWarehouse() {
  const availableWarehouses = state.factories.map((factory) => factory.name);
  if (!availableWarehouses.includes(state.activeWarehouse)) {
    state.activeWarehouse = availableWarehouses[0] ?? '';
  }

  const activeUser = getActiveUser();
  if (!activeUser) {
    return;
  }

  if (activeUser.lastWarehouse) {
    state.activeWarehouse = activeUser.lastWarehouse;
    return;
  }

  const fallback = defaultWarehouseForUser(activeUser);
  if (fallback) {
    activeUser.lastWarehouse = fallback;
    state.activeWarehouse = fallback;
  }
}

function updateAuthDisplay() {
  const userName = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');
  const overlay = document.getElementById('login-overlay');
  const activeUser = getActiveUser();

  if (isAuthenticated() && activeUser) {
    if (userName) {
      userName.textContent = activeUser.name;
    }
    if (logoutBtn) {
      logoutBtn.classList.remove('hidden');
      logoutBtn.disabled = false;
    }
    if (overlay) {
      overlay.classList.add('hidden');
    }
  } else {
    if (userName) {
      userName.textContent = 'Giriş yapınız';
    }
    if (logoutBtn) {
      logoutBtn.classList.add('hidden');
      logoutBtn.disabled = true;
    }
    if (overlay) {
      overlay.classList.remove('hidden');
    }
  }
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

function updateWarehouseSelect() {
  const select = document.getElementById('warehouse-select');
  const field = document.getElementById('warehouse-field');
  if (field) {
    const hideField = isAuthenticated() && isSalesOperationUser();
    field.classList.toggle('hidden', hideField);
  }
  if (!select) {
    return;
  }
  select.innerHTML = buildWarehouseOptionsMarkup();
  if (!state.activeWarehouse && select.options.length > 0) {
    state.activeWarehouse = select.options[0].value;
  }
  select.value = state.activeWarehouse;
  const canManageWarehouses = isAuthenticated() && isManagerUser();
  select.disabled = !canManageWarehouses;
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
    const canAddOrder = isAuthenticated() && userHasPermission('addOrder');
    addOrderBtn.disabled = !canAddOrder;
    addOrderBtn.title = canAddOrder
      ? 'Yeni sipariş ekleyin'
      : 'Sipariş ekleme işlemi Satış Operasyon veya Yönetici rolleri tarafından yapılabilir.';
  }

  const dispatchAllBtn = document.getElementById('dispatch-all-btn');
  if (dispatchAllBtn) {
    const canDispatch = isAuthenticated() && userCanManageFactory(state.activeWarehouse);
    dispatchAllBtn.disabled = !canDispatch;
    dispatchAllBtn.title = canDispatch
      ? 'Seçili ambardaki onaylı sevkiyatları gönderin.'
      : isAuthenticated()
          ? 'Bu ambarda işlem yapma yetkiniz bulunmuyor.'
          : 'Önce giriş yapmalısınız.';
  }

  const deleteOrderBtn = document.getElementById('delete-order-btn');
  if (deleteOrderBtn) {
    const canDelete = canDeleteOrders();
    deleteOrderBtn.disabled = !canDelete;
    deleteOrderBtn.title = canDelete
      ? 'Seçili siparişi silin'
      : 'Sipariş silme işlemi yalnızca yetkili roller tarafından yapılabilir.';
  }

  const addProductBtn = document.getElementById('add-product-btn');
  if (addProductBtn) {
    const canManageProducts = isAuthenticated() && userHasPermission('manageProducts');
    addProductBtn.disabled = !canManageProducts;
    addProductBtn.title = canManageProducts
      ? 'Yeni ürün ekleyin'
      : 'Ürün yönetimi yalnızca yöneticiler tarafından yapılabilir.';
  }
}

function updateRoleManagementVisibility() {
  const manageRolesBtn = document.getElementById('manage-roles-btn');
  if (manageRolesBtn) {
    const canManage = isAuthenticated() && userHasPermission('manageRoles');
    manageRolesBtn.classList.toggle('hidden', !canManage);
    manageRolesBtn.disabled = !canManage;
  }
}

function initializeHeaderControls() {
  const manageRolesBtn = document.getElementById('manage-roles-btn');
  if (manageRolesBtn) {
    manageRolesBtn.addEventListener('click', () => {
      if (!isAuthenticated() || !userHasPermission('manageRoles')) {
        window.alert('Rol değişiklikleri yalnızca yöneticiler tarafından yapılabilir.');
        return;
      }
      openModal('role');
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (!isAuthenticated()) {
        return;
      }
      performLogout();
      const loginEmail = document.getElementById('login-email');
      if (loginEmail) {
        loginEmail.focus();
      }
    });
  }

  updateUserArea();
}

function initializeAuth() {
  const form = document.getElementById('login-form');
  const errorLabel = document.getElementById('login-error');
  if (!form) {
    return;
  }

  if (state.session.isAuthenticated) {
    const activeUser = getActiveUser();
    if (!activeUser) {
      state.session.isAuthenticated = false;
      state.session.loginAt = null;
      state.activeUserId = null;
      schedulePersist();
    } else {
      const overlay = document.getElementById('login-overlay');
      if (overlay) {
        overlay.classList.add('hidden');
      }
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    const user = authenticateUser(email, password);
    if (!user) {
      if (errorLabel) {
        errorLabel.textContent = 'E-posta veya parola hatalı. Lütfen tekrar deneyin.';
      }
      return;
    }

    if (errorLabel) {
      errorLabel.textContent = '';
    }

    completeLogin(user);
    form.reset();
    const overlay = document.getElementById('login-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.focus();
    }
  });
}

function getFactoryNameById(factoryId) {
  return state.factories.find((factory) => factory.id === factoryId)?.name ?? '';
}

function createRoleOptions(selectedRoleId) {
  return Object.entries(roleDefinitions)
    .map(([roleId, role]) => `<option value="${roleId}" ${roleId === selectedRoleId ? 'selected' : ''}>${role.name}</option>`)
    .join('');
}

function createUserRoleCard(user) {
  const assignedFactories = Array.isArray(user.responsibleFactories) ? user.responsibleFactories : [];
  const isSales = user.roleId === 'satis-operasyon';
  const checkboxGroup = state.factories
    .map((factory) => {
      const checked = assignedFactories.some((name) => isSameLocationName(name, factory.name));
      const disabledAttr = isSales ? 'disabled' : '';
      const checkboxClass = isSales ? 'checkbox disabled' : 'checkbox';
      return `
        <label class="${checkboxClass}">
          <input type="checkbox" name="factory-${user.id}" value="${factory.id}" ${checked ? 'checked' : ''} ${disabledAttr} />
          ${escapeHtml(factory.name)}
        </label>
      `;
    })
    .join('');

  const factoryControls = isSales
    ? '<p class="form-hint">Satış Operasyon kullanıcıları depolara bağlı olmadan çalışır.</p>'
    : `<div class="checkbox-group">${checkboxGroup}</div>`;

  const removalDisabled = state.activeUserId === user.id ? 'disabled' : '';
  const removalHint = state.activeUserId === user.id
    ? '<span class="muted">Aktif kullanıcı silinemez.</span>'
    : '';

  return `
    <div class="form-group role-card">
      <div class="form-row">
        <label>Ad Soyad</label>
        <input type="text" name="name-${user.id}" value="${escapeHtml(user.name)}" required />
      </div>
      <div class="form-row">
        <label>E-posta</label>
        <input type="email" name="email-${user.id}" value="${escapeHtml(user.email)}" required />
      </div>
      <div class="form-row">
        <label>Parola</label>
        <input type="text" name="password-${user.id}" value="${escapeHtml(user.password)}" required />
      </div>
      <div class="form-row">
        <label>Rol</label>
        <select name="role-${user.id}">
          ${createRoleOptions(user.roleId)}
        </select>
      </div>
      <div class="form-row">
        <span class="user-label">Sorumlu Fabrikalar</span>
        ${factoryControls}
      </div>
      <div class="form-row remove-row">
        <label class="checkbox danger">
          <input type="checkbox" name="remove-${user.id}" ${removalDisabled} />
          Kullanıcıyı Sil
        </label>
        ${removalHint}
      </div>
    </div>
  `;
}

function renderAll() {
  renderOrdersTable();
  renderArchive();
  renderProductManagement();
  renderFactorySummary();
  renderHatManagement();
  updateUserArea();
  schedulePersist();
}

function renderOrdersTable() {
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) {
    return;
  }

  tbody.innerHTML = '';

  state.orders.forEach((order) => {
    const summaryRow = document.createElement('tr');
    summaryRow.dataset.orderId = order.id;
    summaryRow.dataset.rowType = 'summary';
    if (order.id === state.activeOrderId) {
      summaryRow.classList.add('selected');
    }

    const statusText = order.statusHistory[order.statusHistory.length - 1]?.note ?? 'Durum yok';

    summaryRow.innerHTML = `
      <td><button class="icon-btn" data-role="detail" data-order-id="${order.id}" aria-label="Detay">ℹ️</button></td>
      <td>${escapeHtml(order.orderDate)}</td>
      <td>${escapeHtml(order.invoiceNumber)}</td>
      <td>${escapeHtml(order.type)}</td>
      <td>${escapeHtml(order.routeType)}</td>
      <td>${escapeHtml(order.accountName)}</td>
      <td>${escapeHtml(statusText)}</td>
      <td>${escapeHtml(order.lastUpdate)}</td>
    `;

    tbody.appendChild(summaryRow);
    if (order.id === state.activeOrderId) {
      const detailRow = document.createElement('tr');
      detailRow.dataset.orderId = order.id;
      detailRow.dataset.rowType = 'detail';
      detailRow.className = 'order-detail-row expanded';

      const detailCell = document.createElement('td');
      detailCell.colSpan = 8;
      detailCell.className = 'order-detail-cell';
      detailCell.appendChild(buildOrderDetailFragment(order));

      detailRow.appendChild(detailCell);
      tbody.appendChild(detailRow);
    }
  });

  updateOrderDetailControls();
}

function updateOrderDetailControls() {
  const closeBtn = document.getElementById('orders-close-btn');
  if (!closeBtn) {
    return;
  }
  const hasActiveOrder = Boolean(state.activeOrderId);
  closeBtn.classList.toggle('hidden', !hasActiveOrder);
  closeBtn.disabled = !hasActiveOrder;
}

function buildOrderDetailFragment(order) {
  const template = document.getElementById('order-detail-template');
  const fragment = template.content.cloneNode(true);
  const wrapper = fragment.querySelector('.order-detail-panel');
  if (wrapper) {
    wrapper.dataset.orderId = order.id;
  }

  const closeButton = fragment.querySelector('[data-action="close-detail"]');
  if (closeButton) {
    closeButton.dataset.orderId = order.id;
  }

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
  if (productList) {
    productList.innerHTML = '';
    if (order.products.length === 0) {
      const empty = document.createElement('li');
      empty.textContent = 'Bu siparişe ait ürün kaydı bulunmuyor.';
      productList.appendChild(empty);
    } else {
      order.products.forEach((product) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${escapeHtml(product.name)}</strong>
          <span>Kod: ${escapeHtml(product.code)}</span>
          <span>Miktar: ${escapeHtml(product.qty)}</span>
          <span>Üretim: ${escapeHtml(product.origin)}</span>
        `;
        productList.appendChild(li);
      });
    }
  }

  const statusList = fragment.querySelector('[data-field="statusHistory"]');
  if (statusList) {
    statusList.innerHTML = '';
    if (order.statusHistory.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Henüz durum bilgisi girilmedi.';
      statusList.appendChild(li);
    } else {
      order.statusHistory.forEach((status) => {
        const li = document.createElement('li');
        const time = document.createElement('time');
        time.textContent = status.timestamp;
        const span = document.createElement('span');
        span.textContent = status.note;
        li.append(time, span);
        statusList.appendChild(li);
      });
    }
  }

  const stageList = fragment.querySelector('[data-field="stages"]');
  if (stageList) {
    stageList.innerHTML = '';
    order.stages.forEach((stage) => {
      const li = document.createElement('li');
      const badge = document.createElement('span');
      badge.className = 'badge stage-badge';
      badge.textContent = `Durum: ${stage.status}`;

      const header = document.createElement('strong');
      header.textContent = `${stage.from} → ${stage.to}`;
      const schedule = document.createElement('span');
      schedule.className = 'muted';
      schedule.textContent = `Planlanan Çıkış: ${stage.plannedStart} • Planlanan Varış: ${stage.plannedArrival}`;
      const logistics = document.createElement('span');
      logistics.className = 'muted';
      logistics.textContent = `Taşıma: ${stage.transport} • Sorumlu: ${stage.responsible}`;
      const note = document.createElement('span');
      note.textContent = stage.note;

      li.append(header, schedule, logistics, note, badge);

      if (!stage.completed) {
        const actions = document.createElement('div');
        actions.className = 'stage-actions';
        const btn = document.createElement('button');
        btn.className = 'btn secondary small';
        btn.dataset.action = 'advance-stage';
        btn.dataset.stageId = stage.id;
        btn.dataset.orderId = order.id;
        btn.textContent = 'Sonraki Durum';
        const inboundReady = inboundStagesCompleted(order, stage);
        const canAdvance = canAdvanceStageAction(order, stage);
        btn.disabled = !canAdvance;
        btn.title = canAdvance
          ? 'Aşamayı ilerletin'
          : inboundReady
              ? 'Bu aşama ilgili fabrikanın onayı olmadan ilerletilemez.'
              : 'Giriş onayı tamamlanmadan aşama ilerletilemez.';
        actions.appendChild(btn);
        li.appendChild(actions);
      }

      stageList.appendChild(li);
    });
  }

  return fragment;
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
  if (!tbody) {
    return;
  }
  tbody.innerHTML = '';

  const isLoggedIn = isAuthenticated();
  const canManageProducts = isLoggedIn && userHasPermission('manageProducts');

  state.productCatalog.forEach((product) => {
    const tr = document.createElement('tr');
    tr.dataset.productCode = product.code;
    const codeCell = document.createElement('td');
    codeCell.textContent = product.code;
    const nameCell = document.createElement('td');
    if (canManageProducts) {
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = product.name;
      nameInput.dataset.productCode = product.code;
      nameInput.dataset.field = 'name';
      nameInput.placeholder = 'Ürün adı';
      nameCell.appendChild(nameInput);
    } else {
      nameCell.textContent = product.name;
    }
    const factoryCell = document.createElement('td');
    const groupCell = document.createElement('td');
    const productGroups = Array.isArray(product.groups) && product.groups.length > 0
      ? product.groups
      : ['Tanımsız Grup'];

    if (canManageProducts) {
      const select = document.createElement('select');
      select.dataset.productCode = product.code;
      select.dataset.field = 'factoryId';
      state.factories.forEach((factory) => {
        const option = document.createElement('option');
        option.value = factory.id;
        option.textContent = factory.name;
        select.appendChild(option);
      });
      if (product.factoryId && state.factories.some((factory) => factory.id === product.factoryId)) {
        select.value = product.factoryId;
      } else if (select.options.length > 0) {
        select.selectedIndex = 0;
      }
      factoryCell.appendChild(select);

      const groupsInput = document.createElement('input');
      groupsInput.type = 'text';
      groupsInput.value = productGroups.join(', ');
      groupsInput.dataset.productCode = product.code;
      groupsInput.dataset.field = 'groups';
      groupsInput.placeholder = 'Grup (virgülle)';
      groupCell.appendChild(groupsInput);
    } else {
      factoryCell.textContent = getFactoryNameById(product.factoryId) || '-';
      groupCell.textContent = productGroups.join(', ');
    }

    const actionsCell = document.createElement('td');
    actionsCell.className = 'product-actions-cell';

    if (canManageProducts) {
      const saveBtn = document.createElement('button');
      saveBtn.type = 'button';
      saveBtn.className = 'btn secondary small';
      saveBtn.dataset.action = 'save-product';
      saveBtn.dataset.productCode = product.code;
      saveBtn.textContent = 'Kaydet';

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn ghost small';
      deleteBtn.dataset.action = 'delete-product';
      deleteBtn.dataset.productCode = product.code;
      deleteBtn.textContent = 'Sil';

      actionsCell.append(saveBtn, deleteBtn);
    } else {
      const actionMessage = isLoggedIn ? 'Yetkiniz yok' : 'Giriş yapın';
      actionsCell.innerHTML = `<span class="muted">${actionMessage}</span>`;
    }

    tr.append(codeCell, nameCell, factoryCell, groupCell, actionsCell);
    tbody.appendChild(tr);
  });
}

function renderFactorySummary() {
  const list = document.getElementById('factory-summary');
  if (!list) {
    schedulePersist();
    return;
  }
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

  schedulePersist();
}

function renderHatManagement() {
  const incomingContainer = document.getElementById('incoming-list');
  const outgoingContainer = document.getElementById('outgoing-list');
  if (!incomingContainer || !outgoingContainer) {
    schedulePersist();
    return;
  }
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
      const inboundReady = inboundStagesCompleted(order, stage);
      const manageAllowed = canOperateOutgoingStage(order, stage);
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

      if (!inboundReady) {
        const inboundNotice = document.createElement('span');
        inboundNotice.className = 'muted info-line';
        inboundNotice.textContent = 'Giriş onayı tamamlanana kadar bu sevkiyat hazırlıkları kilitlidir.';
        card.appendChild(inboundNotice);
      }

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
          sendBtn.title = inboundReady
            ? 'Bu sevkiyat farklı bir fabrika tarafından yönetiliyor.'
            : 'Giriş onayı tamamlanmadan çıkış yapılamaz.';
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

  schedulePersist();
}

function handleOrderTableClick(event) {
  const actionElement = event.target.closest('[data-action]');
  if (actionElement) {
    handleOrderDetailAction(event, actionElement);
    return;
  }

  const targetRow = event.target.closest('tr[data-order-id]');
  if (!targetRow) {
    return;
  }

  if (targetRow.dataset.rowType === 'detail') {
    return;
  }

  const orderId = targetRow.dataset.orderId;
  if (!orderId) {
    return;
  }

  if (state.activeOrderId === orderId) {
    state.activeOrderId = null;
  } else {
    state.activeOrderId = orderId;
  }
  renderOrdersTable();
}

function handleOrderDetailAction(event, actionSource) {
  const trigger = actionSource ?? event.target.closest('[data-action]');
  if (!trigger) {
    return;
  }

  const action = trigger.dataset.action;
  if (!action) {
    return;
  }

  const detailContainer = trigger.closest('.order-detail-panel');
  const orderId = trigger.dataset.orderId ?? detailContainer?.dataset.orderId ?? state.activeOrderId;
  const stageId = trigger.dataset.stageId;

  if (action === 'close-detail') {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (state.activeOrderId === orderId) {
      state.activeOrderId = null;
      renderOrdersTable();
    }
    return;
  }

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
    if (!detailContainer) {
      return;
    }

    const order = state.orders.find((item) => item.id === orderId);
    if (!order) {
      return;
    }

    const currentInput = detailContainer.querySelector('[data-field="currentLocationInput"]');
    const nextInput = detailContainer.querySelector('[data-field="nextLocationInput"]');
    const estimateInput = detailContainer.querySelector('[data-field="estimateInput"]');
    const noteInput = detailContainer.querySelector('[data-field="noteInput"]');

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

function handleProductTableChange(event) {
  const target = event.target;
  if (!target) {
    return;
  }

  if (target.dataset.field !== 'factoryId' || !target.dataset.productCode) {
    return;
  }

  if (!isAuthenticated() || !userHasPermission('manageProducts')) {
    renderProductManagement();
    return;
  }

  updateProductField(target.dataset.productCode, 'factoryId', target.value);
}

function handleProductTableClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) {
    return;
  }

  const productCode = button.dataset.productCode;
  if (!productCode) {
    return;
  }

  if (!isAuthenticated() || !userHasPermission('manageProducts')) {
    window.alert('Bu işlem yalnızca yöneticiler tarafından gerçekleştirilebilir.');
    return;
  }

  if (button.dataset.action === 'delete-product') {
    deleteProduct(productCode);
    return;
  }

  if (button.dataset.action === 'save-product') {
    saveProductEdits(productCode, button.closest('tr'));
  }
}

function updateProductField(code, field, value) {
  const product = state.productCatalog.find((item) => item.code === code);
  if (!product) {
    return;
  }

  if (field === 'factoryId') {
    product.factoryId = value;
  } else if (field === 'name') {
    product.name = value;
  } else if (field === 'groups') {
    if (Array.isArray(value)) {
      product.groups = value;
    } else if (typeof value === 'string') {
      product.groups = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  renderFactorySummary();
  schedulePersist();
}

function saveProductEdits(code, row) {
  if (!row) {
    return;
  }

  const nameInput = row.querySelector("input[data-field='name']");
  const groupInput = row.querySelector("input[data-field='groups']");
  const factorySelect = row.querySelector("select[data-field='factoryId']");

  const nameValue = (nameInput?.value || '').trim();
  if (!nameValue) {
    window.alert('Ürün adı boş bırakılamaz.');
    return;
  }

  const groupsRaw = groupInput?.value || '';
  const groups = groupsRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const product = state.productCatalog.find((item) => item.code === code);
  if (!product) {
    return;
  }

  product.name = nameValue;
  product.groups = groups.length ? groups : ['Tanımsız Grup'];
  if (factorySelect) {
    product.factoryId = factorySelect.value;
  }

  renderFactorySummary();
  schedulePersist();

  if (groupInput) {
    groupInput.value = groups.length ? groups.join(', ') : 'Tanımsız Grup';
  }
  if (nameInput) {
    nameInput.value = nameValue;
  }

  renderProductManagement();
}

function deleteProduct(code) {
  const product = state.productCatalog.find((item) => item.code === code);
  if (!product) {
    return;
  }

  const activeUsageCount = state.orders.filter((order) =>
    Array.isArray(order.products) && order.products.some((item) => item.code === code)
  ).length;
  const archivedUsageCount = state.archivedOrders.filter((order) =>
    Array.isArray(order.products) && order.products.some((item) => item.code === code)
  ).length;
  const usageNote = activeUsageCount + archivedUsageCount > 0
    ? ` Bu ürün ${activeUsageCount} aktif ve ${archivedUsageCount} arşiv siparişinde kayıtlı.`
    : '';
  const confirmMessage = `"${product.name}" ürününü silmek istediğinize emin misiniz?${usageNote}`;
  if (!window.confirm(confirmMessage)) {
    return;
  }

  state.productCatalog = state.productCatalog.filter((item) => item.code !== code);
  renderProductManagement();
  renderFactorySummary();
  schedulePersist();
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
    title.textContent = 'Kullanıcı ve Rol Yönetimi';
    const userCards = state.users.map((user) => createUserRoleCard(user)).join('');
    const newUserFactories = state.factories
      .map(
        (factory) => `
          <label class="checkbox">
            <input type="checkbox" name="newFactory[]" value="${factory.id}" />
            ${escapeHtml(factory.name)}
          </label>
        `
      )
      .join('');

    form.innerHTML = `
      <p class="form-hint">Yalnızca yöneticiler kullanıcı rolleri, departman yetkileri ve fabrika sorumluluklarında değişiklik yapabilir.</p>
      <div class="form-section role-management-section">
        <div class="form-section-header">
          <h4>Mevcut Kullanıcılar</h4>
          <p class="form-hint">Ad, iletişim, rol ve fabrika sorumluluklarını güncelleyin.</p>
        </div>
        <div class="form-grid role-grid">${userCards}</div>
      </div>
      <div class="form-section add-user-section">
        <div class="form-section-header">
          <h4>Yeni Kullanıcı Ekle</h4>
          <p class="form-hint">Satış operasyon, ambar veya yönetim ekipleri için yeni giriş oluşturun.</p>
        </div>
        <div class="form-grid new-user-grid">
          <div class="form-group">
            <label>Ad Soyad</label>
            <input type="text" name="newName" placeholder="Örn. Ali Vural" />
          </div>
          <div class="form-group">
            <label>E-posta</label>
            <input type="email" name="newEmail" placeholder="kullanici@firma.com" />
          </div>
          <div class="form-group">
            <label>Parola</label>
            <input type="text" name="newPassword" placeholder="Geçici parola belirleyin" />
          </div>
          <div class="form-group">
            <label>Rol</label>
            <select name="newRole">
              ${createRoleOptions('satis-operasyon')}
            </select>
          </div>
          <div class="form-group full-width">
            <span class="user-label">Sorumlu Fabrikalar</span>
            <div class="checkbox-group">${newUserFactories}</div>
            <p class="form-hint">Satış Operasyon kullanıcıları için seçim yapılmasına gerek yoktur.</p>
          </div>
        </div>
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
  if (!isAuthenticated() || !userHasPermission('addOrder')) {
    window.alert('Sipariş oluşturma yetkiniz bulunmuyor.');
    return false;
  }
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
  state.activeOrderId = null;
  return true;
}

function addProductFromForm(formData) {
  if (!isAuthenticated() || !userHasPermission('manageProducts')) {
    window.alert('Ürün ekleme yetkiniz bulunmuyor.');
    return false;
  }

  const codeInput = (formData.get('productCode') || '').toString().trim();
  const code = codeInput.toUpperCase();
  const nameInput = (formData.get('productName') || '').toString().trim();
  const factoryId = formData.get('factoryId');
  const groupsInput = (formData.get('productGroups') || '').toString();
  const groups = groupsInput
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!code) {
    window.alert('Ürün kodu boş bırakılamaz.');
    return false;
  }

  const duplicate = state.productCatalog.some((product) => product.code.toUpperCase() === code);
  if (duplicate) {
    window.alert('Bu ürün kodu zaten kayıtlı.');
    return false;
  }

  if (!nameInput) {
    window.alert('Ürün adı boş bırakılamaz.');
    return false;
  }

  if (!factoryId) {
    window.alert('Üretim fabrikasını seçmelisiniz.');
    return false;
  }

  state.productCatalog.unshift({
    code,
    name: nameInput,
    factoryId,
    groups: groups.length ? groups : ['Tanımsız Grup']
  });
  return true;
}

function updateRolesFromForm(formData) {
  if (!userHasPermission('manageRoles')) {
    window.alert('Rol değişiklikleri yalnızca yöneticiler tarafından yapılabilir.');
    return false;
  }

  const pendingUsers = [];
  const removalSet = new Set();

  for (const user of state.users) {
    const removeRequested = formData.get(`remove-${user.id}`) === 'on';
    if (removeRequested) {
      if (state.activeUserId === user.id) {
        window.alert('Aktif oturumdaki kullanıcı silinemez.');
        return false;
      }
      removalSet.add(user.id);
    }
  }

  for (const user of state.users) {
    if (removalSet.has(user.id)) {
      continue;
    }

    const name = (formData.get(`name-${user.id}`) || '').trim();
    const email = (formData.get(`email-${user.id}`) || '').trim();
    const password = (formData.get(`password-${user.id}`) || '').trim();

    if (!name || !email || !password) {
      window.alert('Kullanıcı bilgileri boş bırakılamaz.');
      return false;
    }

    const selectedRoleId = formData.get(`role-${user.id}`) || user.roleId;
    if (!roleDefinitions[selectedRoleId]) {
      window.alert('Geçersiz rol seçimi yapıldı.');
      return false;
    }

    const selectedFactories = formData.getAll(`factory-${user.id}`);
    const resolvedFactories = selectedFactories
      .map((factoryId) => state.factories.find((factory) => factory.id === factoryId)?.name)
      .filter(Boolean);

    const updatedUser = {
      ...user,
      name,
      email,
      password,
      roleId: selectedRoleId,
      responsibleFactories: selectedRoleId === 'satis-operasyon' ? [] : resolvedFactories
    };

    if (updatedUser.roleId === 'satis-operasyon') {
      updatedUser.lastWarehouse = null;
    } else if (updatedUser.responsibleFactories.length > 0) {
      const hasCurrent = updatedUser.responsibleFactories.some((name) =>
        isSameLocationName(name, updatedUser.lastWarehouse)
      );
      updatedUser.lastWarehouse = hasCurrent
        ? updatedUser.lastWarehouse ?? updatedUser.responsibleFactories[0]
        : updatedUser.responsibleFactories[0];
    } else {
      updatedUser.lastWarehouse = null;
    }

    pendingUsers.push(updatedUser);
  }

  const seenEmails = new Set();
  for (const user of pendingUsers) {
    const emailKey = user.email.trim().toLowerCase();
    if (seenEmails.has(emailKey)) {
      window.alert('Her kullanıcının benzersiz bir e-posta adresi olmalıdır.');
      return false;
    }
    seenEmails.add(emailKey);
  }

  const newName = (formData.get('newName') || '').trim();
  const newEmail = (formData.get('newEmail') || '').trim();
  const newPassword = (formData.get('newPassword') || '').trim();
  const newRole = formData.get('newRole') || 'satis-operasyon';
  const newFactories = formData.getAll('newFactory[]');

  if (newName || newEmail || newPassword) {
    if (!newName || !newEmail || !newPassword) {
      window.alert('Yeni kullanıcı eklemek için ad, e-posta ve parola alanlarını doldurun.');
      return false;
    }
    if (!roleDefinitions[newRole]) {
      window.alert('Yeni kullanıcı için geçerli bir rol seçin.');
      return false;
    }

    const normalizedNewEmail = newEmail.trim().toLowerCase();
    if (seenEmails.has(normalizedNewEmail)) {
      window.alert('Bu e-posta adresi zaten kayıtlı.');
      return false;
    }

    const resolvedNewFactories = newFactories
      .map((factoryId) => state.factories.find((factory) => factory.id === factoryId)?.name)
      .filter(Boolean);

    const newUser = {
      id: generateUserId(),
      name: newName,
      email: newEmail,
      password: newPassword,
      roleId: newRole,
      responsibleFactories: newRole === 'satis-operasyon' ? [] : resolvedNewFactories,
      lastWarehouse:
        newRole === 'satis-operasyon' ? null : resolvedNewFactories[0] ?? null
    };

    pendingUsers.push(newUser);
    seenEmails.add(normalizedNewEmail);
  }

  const managerCount = pendingUsers.filter((user) => user.roleId === 'yonetici').length;
  if (managerCount === 0) {
    window.alert('Sistemde en az bir yönetici bulunmalıdır.');
    return false;
  }

  state.users = pendingUsers;

  if (state.activeUserId && !state.users.some((user) => user.id === state.activeUserId)) {
    performLogout();
  }

  updateUserArea();
  return true;
}

function deleteActiveOrder() {
  if (!state.activeOrderId) {
    window.alert('Silinecek sipariş bulunamadı.');
    return;
  }

  if (!canDeleteOrders()) {
    window.alert('Sipariş silme işlemi yalnızca yetkili roller tarafından yapılabilir.');
    return;
  }

  const confirmation = window.confirm('Seçili siparişi silmek istediğinize emin misiniz?');
  if (!confirmation) {
    return;
  }

  const index = state.orders.findIndex((order) => order.id === state.activeOrderId);
  if (index > -1) {
    state.orders.splice(index, 1);
    state.activeOrderId = null;
    renderAll();
  }
}

function canAdvanceStageAction(order, stage) {
  if (!stage) {
    return false;
  }
  const nextProgress = Math.min(stage.progress + 1, stageStatuses.length - 1);
  if (nextProgress === stage.progress) {
    return false;
  }
  if (nextProgress <= 2) {
    return canOperateOutgoingStage(order, stage);
  }
  if (nextProgress === 3) {
    const incomingAllowed = canManageIncomingStage(stage);
    if (incomingAllowed) {
      return true;
    }
    const outgoingAllowed = canManageOutgoingStage(stage);
    const canCompleteFromSource = outgoingAllowed && !incomingAllowed && !isKnownFactoryLocation(stage.to);
    return canCompleteFromSource;
  }
  return false;
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
  const inboundReady = inboundStagesCompleted(order, stage);

  if (nextProgress <= 2 && !outgoingAllowed) {
    window.alert('Bu aşama yalnızca ilgili üretim fabrikası tarafından ilerletilebilir.');
    return;
  }

  if (nextProgress <= 2 && !inboundReady) {
    window.alert('Sipariş giriş onayı tamamlanmadan aşama ilerletilemez.');
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

  if (!inboundStagesCompleted(order, stage)) {
    window.alert('Sipariş giriş onayı tamamlanmadan sevkiyat çıkışı yapılamaz.');
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
  if (!isAuthenticated()) {
    window.alert('Sevkiyat çıkışı yapabilmek için önce giriş yapmalısınız.');
    return;
  }
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
    if (!canOperateOutgoingStage(order, stage) || stage.progress !== 1) {
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
  state.activeOrderId = null;
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
    state.activeOrderId = null;
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
