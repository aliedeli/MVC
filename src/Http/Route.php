<?php
namespace SecTheater\Http;
use App\Models\Screens;
use App\Models\Session;
use SecTheater\view\View;
Session::start();
class Route
{
    public static array $routes =[];
    protected Request $request;
    protected Response $response;

    public function __construct(Request $request ,Response $response)
    {
        $this->request =$request;
        $this->response=$response;
        
    }

    public static function get($route, $action,$params=[])
    {
       self::$routes['get'][$route]=$action;
        
   
        
        
    }

    public static function post($route, $action)
    {

        self::$routes['post'][$route]=$action;
        
    }
    public function resolve()
    {
        $path= $this->request->path();
        $method= $this->request->method();
        $action =self::$routes[$method][$path] ?? false ;
       
   


      
       

        if(!array_key_exists($path , self::$routes[$method]))
        {
            View::makeError('404');
        }
       
      

        if(!$action)
        {
            return;
        }
     

        if(is_callable($action))
        {
            call_user_func_array($action,[]);
        }
        if(is_array($action))
        {
        if($method == 'get')
            {
             if(Screens::verification(Session::get('UserID'),$action[1]) || $action[1] == 'login')
          {
            call_user_func_array([new $action[0],$action[1]], [] );
         }else{
               View::makeError('404');
           }
        }else{
             call_user_func_array([new $action[0],$action[1]], [] );
        }
      
            
           
           
        }
    }

}

