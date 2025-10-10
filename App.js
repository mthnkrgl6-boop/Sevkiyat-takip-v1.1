const stageStatuses = ['Bekliyor', 'Hazırlanıyor', 'Yolda', 'Tamamlandı'];

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

const state = {
  factories,
  orders: [
    {
      id: 'ORD-HTY-235664',
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
          id: 'ORD-HTY-235664-1',
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
          id: 'ORD-HTY-235664-2',
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
      id: 'ORD-ANK-336744',
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
          id: 'ORD-ANK-336744-1',
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
      id: 'ORD-MLT-363723',
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
      statusHistory: [
        { timestamp: '09.11.2024 12:10', note: 'İstanbul Şirin: Metal raf sistemleri paketlendi.' }
      ],
      products: [
        { code: 'METAL-KONSTR-45', name: 'Metal Raf Profili', qty: 150, origin: 'İstanbul Şirin Fabrika' },
        { code: 'PVC-SK-50', name: 'PVC Ek Parça Seti', qty: 200, origin: 'Sakarya Fabrika' }
      ],
      stages: [
        {
          id: 'ORD-MLT-363723-1',
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
          id: 'ORD-MLT-363723-2',
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
      orderDate: '12.08.2024 11:00',
      invoiceNumber: '225987',
      type: 'Şantiye',
      routeType: 'Direkt',
      accountName: 'İzmir Stadyum Projesi',
      deliveredAt: '18.08.2024 17:40'
    },
    {
      orderDate: '22.09.2024 15:20',
      invoiceNumber: '248991',
      type: 'Müşteri Depo',
      routeType: 'Bölge',
      accountName: 'Bursa Bölge Deposu',
      deliveredAt: '26.09.2024 09:10'
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
  activeWarehouse: factories.find((factory) => factory.id === 'aksaray-merkez').name,
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
  state.activeOrderId = state.orders[0]?.id ?? null;
  renderAll();
});

function initialiseOrders() {
  state.orders.forEach((order) => {
    order.stages.forEach((stage) => {
      stage.status = stageStatuses[stage.progress] ?? stage.status;
      stage.completed = stage.progress >= stageStatuses.length - 1;
    });
    updateOrderFlow(order);
  });
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
  document.getElementById('add-order-btn').addEventListener('click', () => openModal('order'));
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
  document.getElementById('incoming-list').addEventListener('change', handleIncomingAction);
  document.getElementById('outgoing-list').addEventListener('click', handleOutgoingAction);
  document.getElementById('product-table-body').addEventListener('change', handleProductFactoryChange);
}

function setupWarehouseSelect() {
  const select = document.getElementById('warehouse-select');
  select.innerHTML = state.factories
    .map((factory) => `<option value="${factory.name}">${factory.name}</option>`)
    .join('');
  select.value = state.activeWarehouse;
  select.addEventListener('change', (event) => {
    state.activeWarehouse = event.target.value;
    renderHatManagement();
  });
}

function renderAll() {
  renderOrdersTable();
  renderOrderDetail();
  renderArchive();
  renderProductManagement();
  renderFactorySummary();
  renderHatManagement();
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

  const mapFigure = fragment.querySelector('[data-field="map"]');
  if (mapFigure) {
    mapFigure.innerHTML = `
      <img
        src="https://www.paintmaps.com/countries/IMG/turkey-provinces-outline.png"
        alt="Türkiye iller haritası"
        class="map-image"
      />
      <div class="map-overlay">
        <strong>${finalStop}</strong>
        <span>${order.currentLocation || 'Kaynak'} çıkışlı sevkiyat</span>
      </div>
    `;
  }

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
    .querySelectorAll('[data-action="add-status"], [data-action="add-estimate"]')
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

  if (incomingStages.length === 0) {
    incomingContainer.innerHTML = '<p class="muted">Gelen sipariş bulunmuyor.</p>';
  } else {
    incomingStages.forEach(({ order, stage }) => {
      const card = document.createElement('div');
      card.className = 'hat-card';
      card.innerHTML = `
        <div class="hat-card-header">
          <strong>${order.id}</strong>
          <span class="badge">${stage.status}</span>
        </div>
        <span>Nereden: ${stage.from}</span>
        <span>Planlanan Varış: ${stage.plannedArrival}</span>
        <span>Ürün Notu: ${stage.note}</span>
      `;
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
      input.disabled = stage.progress < 2;
      checkbox.append(input, document.createTextNode('Onay'));
      actions.appendChild(checkbox);

      card.appendChild(actions);
      incomingContainer.appendChild(card);
    });
  }

  if (outgoingStages.length === 0) {
    outgoingContainer.innerHTML = '<p class="muted">Çıkış için bekleyen sipariş yok.</p>';
  } else {
    outgoingStages.forEach(({ order, stage }) => {
      const card = document.createElement('div');
      card.className = 'hat-card';
      card.innerHTML = `
        <div class="hat-card-header">
          <strong>${order.id}</strong>
          <span class="badge">${stage.status}</span>
        </div>
        <span>Nereye: ${stage.to}</span>
        <span>Planlanan Çıkış: ${stage.plannedStart}</span>
        <span>Sorumlu: ${stage.responsible}</span>
      `;

      const actions = document.createElement('div');
      actions.className = 'hat-card-actions';
      if (stage.progress < 2) {
        const sendBtn = document.createElement('button');
        sendBtn.className = 'btn primary small';
        sendBtn.dataset.action = 'dispatch-stage';
        sendBtn.dataset.stageId = stage.id;
        sendBtn.dataset.orderId = order.id;
        sendBtn.textContent = 'Gönder';
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

  if (action === 'add-status') {
    const note = window.prompt('Yeni sevk durumu notunu girin:');
    if (note) {
      const order = state.orders.find((item) => item.id === orderId);
      if (order) {
        addHistory(order, note);
        renderAll();
      }
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
  if (target.dataset.action !== 'approve-stage') {
    return;
  }

  const { orderId, stageId } = target.dataset;
  if (target.checked) {
    completeStage(orderId, stageId);
  }
}

function handleOutgoingAction(event) {
  const target = event.target;
  const action = target.dataset.action;
  if (!action) {
    return;
  }

  if (action === 'dispatch-stage') {
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
    form.innerHTML = `
      <div class="form-group">
        <label>Sipariş Tarihi</label>
        <input type="datetime-local" name="orderDate" required />
      </div>
      <div class="form-group">
        <label>Fatura Numarası</label>
        <input type="text" name="invoiceNumber" placeholder="Örn. 123456" />
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
        <select name="routeType" required>
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
        <select name="startFactory" required>
          ${state.factories.map((factory) => `<option value="${factory.id}">${factory.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Birleştirme Fabrikası (opsiyonel)</label>
        <select name="consolidationFactory">
          <option value="">Seçiniz</option>
          ${state.factories.map((factory) => `<option value="${factory.id}">${factory.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Son Varış Konumu</label>
        <input type="text" name="finalDestination" required placeholder="Örn. Hatay Şantiye" />
      </div>
      <div class="form-group">
        <label>Tahmini Teslimat</label>
        <input type="datetime-local" name="estimatedDelivery" />
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
  }

  form.onsubmit = handleModalSubmit;
  const cancelButton = form.querySelector('#modal-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', closeModal, { once: true });
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

function handleModalSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  if (modalState.type === 'order') {
    addOrderFromForm(formData);
  } else if (modalState.type === 'product') {
    addProductFromForm(formData);
  }

  closeModal();
  renderAll();
}

function addOrderFromForm(formData) {
  const orderDateInput = formData.get('orderDate');
  const orderDate = orderDateInput ? formatDateFromInput(orderDateInput) : formatNow();
  const invoiceNumber = formData.get('invoiceNumber') || generateInvoiceNumber();
  const type = formData.get('orderType');
  const routeType = formData.get('routeType');
  const accountName = formData.get('accountName');
  const startFactory = state.factories.find((factory) => factory.id === formData.get('startFactory'));
  const consolidationFactoryId = formData.get('consolidationFactory');
  const consolidationFactory = state.factories.find((factory) => factory.id === consolidationFactoryId);
  const finalDestination = formData.get('finalDestination');
  const estimatedDeliveryInput = formData.get('estimatedDelivery');
  const estimatedDelivery = estimatedDeliveryInput ? formatDateFromInput(estimatedDeliveryInput) : '';
  const note = formData.get('note') || '';

  const newOrderId = generateOrderId();
  const newOrder = {
    id: newOrderId,
    orderDate,
    invoiceNumber,
    type,
    routeType,
    accountName,
    currentLocation: startFactory?.name ?? '-',
    nextLocation: consolidationFactory ? consolidationFactory.name : finalDestination,
    estimatedDelivery: estimatedDelivery || '- Tahmini bekleniyor -',
    lastUpdate: orderDate,
    finalDestination: finalDestination || '-',
    statusHistory: [],
    products: [],
    stages: []
  };

  newOrder.statusHistory.push({
    timestamp: orderDate,
    note: `${startFactory?.name ?? 'Belirsiz'}: Sipariş oluşturuldu.`
  });

  const firstStage = {
    id: `${newOrderId}-1`,
    from: startFactory?.name ?? 'Belirtilmedi',
    to: consolidationFactory ? consolidationFactory.name : finalDestination,
    plannedStart: extractDate(orderDate),
    plannedArrival: consolidationFactory ? extractDate(orderDate) : (estimatedDelivery || '-'),
    transport: 'Tır',
    note: note || 'Yeni sevkiyat planı oluşturuldu.',
    responsible: `${startFactory?.name ?? 'Fabrika'} Lojistik`,
    progress: 0,
    status: stageStatuses[0],
    completed: false
  };
  newOrder.stages.push(firstStage);

  if (consolidationFactory) {
    const secondStage = {
      id: `${newOrderId}-2`,
      from: consolidationFactory.name,
      to: finalDestination,
      plannedStart: extractDate(orderDate),
      plannedArrival: estimatedDelivery || '-',
      transport: 'Tır',
      note: 'Birleştirme sonrası sevkiyat.',
      responsible: `${consolidationFactory.name} Sevkiyat`,
      progress: 0,
      status: stageStatuses[0],
      completed: false
    };
    newOrder.stages.push(secondStage);
  }

  updateOrderFlow(newOrder);
  state.orders.unshift(newOrder);
  state.activeOrderId = newOrder.id;
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

  setStageProgress(order, stage, nextProgress);

  const note = progressNote(stage, nextProgress);
  if (note) {
    addHistory(order, note);
  }

  updateOrderFlow(order);
  renderAll();
}

function dispatchStage(orderId, stageId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    return;
  }
  const stage = order.stages.find((item) => item.id === stageId);
  if (!stage) {
    return;
  }

  if (stage.progress >= 2) {
    return;
  }

  setStageProgress(order, stage, 2);
  addHistory(order, `${stage.from}: Sevkiyat yola çıktı.`);
  updateOrderFlow(order);
  renderAll();
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

  if (stage.progress >= 3) {
    return;
  }

  setStageProgress(order, stage, 3);
  addHistory(order, `${stage.to}: Giriş onayı verildi.`);
  updateOrderFlow(order);
  renderAll();
}

function dispatchAllFromWarehouse() {
  const activeWarehouse = state.activeWarehouse;
  let updated = false;
  state.orders.forEach((order) => {
    order.stages.forEach((stage) => {
      if (stage.from === activeWarehouse && stage.progress < 2) {
        setStageProgress(order, stage, 2);
        addHistory(order, `${stage.from}: Sevkiyat toplu gönderildi.`);
        updated = true;
      }
    });
    updateOrderFlow(order);
  });

  if (updated) {
    renderAll();
  }
}

function setStageProgress(order, stage, progress) {
  stage.progress = progress;
  stage.status = stageStatuses[progress];
  stage.completed = progress >= stageStatuses.length - 1;
  order.lastUpdate = formatNow();
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

function generateOrderId() {
  const random = Math.floor(Math.random() * 900 + 100);
  return `ORD-${Date.now()}-${random}`;
}

function generateInvoiceNumber() {
  return String(Math.floor(Math.random() * 900000) + 100000);
}
