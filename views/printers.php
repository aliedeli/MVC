<?php

header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="document.pdf"');
header('Cache-Control: private, max-age=0, must-revalidate');
header('Pragma: public');

use Mpdf\Mpdf;
use Database\Database;
use App\Models\Session;

    Session::start();
   
  
    if (is_null(Session::get('UserID')) ) {
        header("Location: /login");
         
    }






class pdf extends Mpdf 
{
    public $html;
    public $id;
    public $name;
    public $namewde;
    public $phone;
    public $date;
    public $db;
    public $toltal;
    public $src;
    public $UserName;
    public function __construct()
    {

        $this->db=(new Database())->conn();
        parent::__construct([
        'default_font' => 'amiri',
        'mode' => 'utf-8',
        'format' => 'A6',
        'directionality' => 'rtl'
        ]);
    
       

        $this->id=filter_input(INPUT_GET,'id',FILTER_SANITIZE_NUMBER_INT) ?? null;
        // $this->name=filter_input(INPUT_GET,'name',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        // $this->date=filter_input(INPUT_GET,'date',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;

        $this->namewde=env('App_NAME');
        $this->src=env('App_SRC_LOGO');
        $this->getCustomers();
        
    }
    public function getCustomers()
    {
        $sql=$this->db->prepare("select * from sale left join Customers on sale.cusID=Customers.CusID  left join phone on  Customers.CusID=phone.CusID where sale.saleID=:id");
        $sql->execute([':id'=> $this->id]);
        $r= $sql->fetchAll(PDO::FETCH_ASSOC);
        $this->name=$r[0]['name'];
        $this->date=$r[0]['dateSale'];
        $this->toltal=$r[0]['toltal'];
        $this->phone=$r[0]['phone'];
        $this->UserName=$r[0]['UserName'];

    }   

    public function _header()
    {
      
      return   "
    <style>
        body { font-family: amiri; direction: rtl; text-align: right; }
        samp{width: 100%;height: 10%; display: flex; justify-content: center; align-items: center;}
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        table, th, td { border: 1px solid #000; }
        th, td { padding: 8px;  text-align: center; }
        .total { width: 80%; font-weight: bold; text-align: left;  }

    </style>


<h1 style=' text-align:center; ' >  $this->namewde

<img  style=' text-align:left; width: 40px; height:40px; 'src='$this->src' >
</h1>
<h3 style='font:40px; text-align:center;'>فاتورة شراء</h3>



<p style='font:40px; text-align:center;'> رقم الفاتوره : $this->id </p>
<p>العميل: $this->name </p>
 <samp>  تاريخ شراء : $this->date </samp>
 <br>
 <samp> هاتف : $this->phone </samp>
<table>
     <thead>
         <tr>
             <th>المنتج</th>
             <th> العداد </th>             
             <th>السعر</th>
            <th>الإجمالي</th>
        </tr>
    </thead>
     <tbody>


";
        
    
}
public function body()
{   
$html ='';
$sqlD = $this->db->prepare("SELECT * FROM sale_details WHERE saleID = :id");
$sqlD->execute([':id' => $this->id]);
$rd = $sqlD->fetchAll(PDO::FETCH_ASSOC);

foreach($rd as $row){

$html.="
        <tr>
            <td>{$row['ItemName']}</td>
            <td>{$row['qty']}</td>
            <td>{$row['price']}</td>
            <td>{$row['toltal']}</td>
        </tr>
    

";
}
return $html;

}
public function end()
{
      return  "
        


           
        
                 </tbody>
    <tr>
           <th >
           
           الإجمالي

           </th>
           <th>
            {$this->toltal} جنيه

           </th>
              </tr>
            </table>
            <p>اسم البائع :{$this->UserName} <p>
            ";
 }
public function print()
{
    parent::SetTitle($this->name);
     $this->html = $this->_header() . $this->body() . $this->end() ;
     $this->WriteHTML($this->html);
     
     $this->Output();

}


}

$p=new pdf();
$p->autoLangToFont = true;
$p->fontdata['amiri'] = [
    'R' => 'Amiri-Regular.ttf',
    'B' => 'Amiri-Bold.ttf'
];
$p->print();

 ?>
