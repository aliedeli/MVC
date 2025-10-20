
  <style>
 
   

  </style>
</head>
<body>
  <div class="container">
    
      <h1>خزنة إدارة المبيعات — صفحة تفاعلية</h1>
      <div class="muted">أضف العمليات ليتحدّث الرصيد تلقائيًا</div>
  <?php  include   view_path() .'partials/safe.php'; ?>
<div class="button">
    <button type="button" class="btn btn-primary" id="btn-card">
        safe
    </button>
</div>
    <table id="safeTable">
        <thead>
          <tr>
            <th>الرقم</th>
            <th>التاريخ</th>
            <th>رقم الفاتورة</th>
            <th>اسم العميل</th>
            <th>نوع العملية</th>
            <th>الداخل</th>
            <th>الخارج</th>
            <th>الرصيد</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
  </div>

  <script src="js/safe.js"></script>
  <script>
    // بيانات العمليات مخزنة في ذاكرة الصفحة (يمكن ربطها بخادم لاحقًا)

    // let entries = JSON.parse(localStorage.getItem('salesSafe_entries') || '[]');

    
    // const els = {
    //   tbody: document.querySelector('#safeTable tbody'),
    //   form: document.getElementById('entryForm'),
    //   date: document.getElementById('date'),
    //   invoice: document.getElementById('invoice'),
    //   customer: document.getElementById('customer'),
    //   type: document.getElementById('type'),
    //   inAmount: document.getElementById('inAmount'),
    //   outAmount: document.getElementById('outAmount'),
    //   addBtn: document.getElementById('addBtn'),
    //   clearBtn: document.getElementById('clearBtn'),
    //   exportBtn: document.getElementById('exportBtn'),
    //   currentBalance: document.getElementById('currentBalance'),
    //   totalIn: document.getElementById('totalIn'),
    //   totalOut: document.getElementById('totalOut')
    // };

    // function renderTable(){
    //   els.tbody.innerHTML = '';
    //   let running = 0;
    //   let totalIn = 0, totalOut = 0;

    //   entries.forEach((row, idx) => {
    //     running = (running + Number(row.inAmount) - Number(row.outAmount));
    //     row.balance = running.toFixed(2);
    //     totalIn += Number(row.inAmount);
    //     totalOut += Number(row.outAmount);

    //     const tr = document.createElement('tr');
    //     tr.innerHTML = `
    //       <td>${idx+1}</td>
    //       <td>${row.date}</td>
    //       <td>${escapeHtml(row.invoice)}</td>
    //       <td>${escapeHtml(row.customer)}</td>
    //       <td>${escapeHtml(row.type)}</td>
    //       <td>${Number(row.inAmount).toFixed(2)}</td>
    //       <td>${Number(row.outAmount).toFixed(2)}</td>
    //       <td>${row.balance}</td>
    //       <td class="actions">
    //         <button class="edit" data-i="${idx}">تعديل</button>
    //         <button class="del" data-i="${idx}">حذف</button>
    //       </td>
    //     `;
    //     els.tbody.appendChild(tr);
    //   });

    //   els.currentBalance.textContent = running.toFixed(2);
    //   els.totalIn.textContent = totalIn.toFixed(2);
    //   els.totalOut.textContent = totalOut.toFixed(2);

    //   localStorage.setItem('salesSafe_entries', JSON.stringify(entries));
    // }

    // function escapeHtml(s){ return (s||'').toString().replace(/[&<>\"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];}); }

    // function clearForm(){
    //   els.date.value = '';
    //   els.invoice.value = '';
    //   els.customer.value = '';
    //   els.type.value = 'مبيعات نقدية';
    //   els.inAmount.value = '0';
    //   els.outAmount.value = '0';
    // }

    // function addEntry(){
    //   if(!els.date.value){ alert('رجاءً اختر التاريخ'); return; }
    //   const entry = {
    //     date: els.date.value,
    //     invoice: els.invoice.value.trim(),
    //     customer: els.customer.value.trim(),
    //     type: els.type.value,
    //     inAmount: parseFloat(els.inAmount.value) || 0,
    //     outAmount: parseFloat(els.outAmount.value) || 0,
    //     balance: 0
    //   };
    //   entries.push(entry);
    //   renderTable();
    //   clearForm();
    // }

    // // أحداث الأزرار
    // els.addBtn.addEventListener('click', addEntry);
    // els.clearBtn.addEventListener('click', clearForm);

    // // التعامل مع تعديل أو حذف
    // els.tbody.addEventListener('click', function(e){
    //   const btn = e.target.closest('button');
    //   if(!btn) return;
    //   const idx = Number(btn.dataset.i);
    //   if(btn.classList.contains('del')){
    //     if(confirm('هل تريد حذف هذه العملية؟')){
    //       entries.splice(idx,1);
    //       renderTable();
    //     }
    //   } else if(btn.classList.contains('edit')){
    //     const row = entries[idx];
    //     els.date.value = row.date;
    //     els.invoice.value = row.invoice;
    //     els.customer.value = row.customer;
    //     els.type.value = row.type;
    //     els.inAmount.value = row.inAmount;
    //     els.outAmount.value = row.outAmount;
    //     // عند الحفظ بعد التعديل، سنستبدل السجل الحالي
    //     if(confirm('بعد التعديل اضغط موافق لحفظ التغييرات')){
    //       // remove old and add new at same index
    //       entries.splice(idx,1,{
    //         date: els.date.value,
    //         invoice: els.invoice.value.trim(),
    //         customer: els.customer.value.trim(),
    //         type: els.type.value,
    //         inAmount: parseFloat(els.inAmount.value) || 0,
    //         outAmount: parseFloat(els.outAmount.value) || 0,
    //         balance: 0
    //       });
    //       renderTable();
    //       clearForm();
    //     }
    //   }
    // });

    // // تصدير CSV
    // els.exportBtn.addEventListener('click', function(){
    //   if(entries.length===0){ alert('لا توجد بيانات للتصدير'); return; }
    //   const header = ['Transaction#','Date','InvoiceNo','Customer','Type','InAmount','OutAmount','Balance'];
    //   const rows = entries.map((r,i)=>[
    //     i+1, r.date, r.invoice, r.customer, r.type, Number(r.inAmount).toFixed(2), Number(r.outAmount).toFixed(2), r.balance
    //   ]);
    //   const csv = [header, ...rows].map(r=>r.map(cell=>`"${(cell||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
    //   const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'sales_safe.csv';
    //   a.click();
    //   URL.revokeObjectURL(url);
    // });

    // // تهيئة الصفحة من التخزين المحلي
    // renderTable();
  </script>

