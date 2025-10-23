<?php
use App\Models\Session;
Session::start();
if(isset($_GET['out']))
{
     Session::destroy();
     header('Location: /login');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="<?=env('App_SRC_LOGO')?>" type="image/x-icon">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/all.min.css">
    <script type="module" src="js/min.js"></script>
    
    <title><?=env('App_NAME')?></title>
</head>
<body>
     <?php include   base_path() .'views/partials/navbar.php'; ?>
     <div class="main-container">
      
        <?php 
    

        if(is_null(Session::get('UserID')))
        {
          
        }else
        {
             include   base_path() .'views/partials/menu.php';
        }


?>

         <div class="content">
                 {{content}}
         </div>
            
    </div>
        
    <script src="js/all.min.js"></script>
    

</body>
</html>

