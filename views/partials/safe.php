  <section class="card" id="card">
      <form id="entryForm" class="grid" onsubmit="return false;">
        <div>
          <label>التاريخ</label>
          <input type="date" id="date" required>
        </div>
        <div>
          <label>رقم الفاتورة</label>
          <input type="text" id="invoice" placeholder="مثال INV-001">
        </div>
        <div>
          <label>اسم العميل</label>
          <input type="text" id="customer" placeholder="اسم العميل أو الجهة">
        </div>
        <div>
          <label>نوع العملية</label>
          <select id="type">
            <option value="مبيعات نقدية">مبيعات نقدية</option>
            <option value="مبيعات آجل">مبيعات آجل</option>
            <option value="سداد">سداد</option>
            <option value="مصروف">مصروف</option>
          </select>
        </div>
        <div>
          <label>المبلغ الداخل (ريال)</label>
          <input type="number" id="inAmount" step="0.01" min="0" value="0">
        </div>
        <div>
          <label>المبلغ الخارج (ريال)</label>
          <input type="number" id="outAmount" step="0.01" min="0" value="0">
        </div>

        <div style="grid-column:span 2;display:flex;gap:8px;margin-top:6px">
          <button class="btn" id="addBtn">أضف العملية</button>
          <button class="btn secondary" id="clearBtn" type="button">تفريغ الحقول</button>
          <button class="btn secondary" id="exportBtn" type="button">تصدير CSV</button>
          <button class="btn secondary" id="Close" type="button"> غلاق</button>
        </div>
      </form>

      <div class="note">ملاحظة: الرصيد المحسوب = الرصيد السابق + الداخل - الخارج. يدعم التصدير إلى CSV وتخزين محلي في المتصفح.</div>

      <div class="summary" id="summary">
        <div class="chip">الرصيد الحالي<br><strong id="currentBalance">0.00</strong></div>
        <div class="chip">إجمالي الداخل<br><strong id="totalIn">0.00</strong></div>
        <div class="chip">إجمالي الخارج<br><strong id="totalOut">0.00</strong></div>
      </div>

    
    </section>