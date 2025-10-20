<?php


use FPDF\FPDF;
use Dotenv\Dotenv;
use FPDF\PDF_Arabic;
use Database\Database;

use App\Models\Screens;
use SecTheater\Http\Route;
use SecTheater\Application;
use SecTheater\Suppors\Arr;
use SecTheater\Http\Request;
require_once __DIR__ . '/../src/Suppors/helpers.php';


require_once  base_path() . '/vendor/autoload.php';


require_once base_path()  . '/routes/web.php';

use SecTheater\Http\ResponsedfF;



$env= Dotenv::createImmutable(base_path());
$env->load();

app()->run();






