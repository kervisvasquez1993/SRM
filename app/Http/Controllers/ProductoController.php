<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Proveedor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $id_proveedor = $request->query('id_proveedor');
        $proveedor = Proveedor::findOrFail($id_proveedor);
        
        return view('producto.index', compact('id_proveedor', 'proveedor'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {   
        $id_proveedor = $request->query('id_proveedor');
        return view('producto.create', compact('id_proveedor'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id_proveedor = $request->query('id_proveedor');

        $data = $request->validate([
            'name' => 'required',
            'marca' => 'required',
            'codigo' => 'required',
            'codigo-hs' => 'required',
            'descripcion' => 'required',
            'vida-util' => 'required|numeric',
            'totalpcs' => 'required|numeric',
            'pcs-empaque-unitario' => 'required|numeric',
            'pcs-empaque-interno' => 'required|numeric',
            'pcs-carton' => 'required|numeric',
            'largo-carton' => 'required|numeric',
            'alto-carton' => 'required|numeric',
            'ancho-carton' => 'required|numeric',
            'cbm' => 'required|numeric',
            'peso-neto' => 'required|numeric',
            'peso-bruto' => 'required|numeric',
            'total-cbm' => 'required|numeric',
            'total-peso-neto' => 'required|numeric',
            'total-peso-bruto' => 'required|numeric',
            'total-ctn' => 'required|numeric',
            'corregido-total-pcs' => 'required|numeric',
        ]);

        $producto = new Producto();

        $producto->proveedor_id = $id_proveedor;
        $producto->product_name = $data['name'] ;
        $producto->brand = $data['marca'];
        $producto->product_code = $data['codigo'];
        $producto->hs_code = $data['codigo-hs'];
        $producto->description = $data['descripcion'];
        $producto->shelf_life = $data['vida-util'];
        $producto->total_pcs = $data['totalpcs'];
        $producto->pcs_unit = $data['pcs-empaque-unitario'];
        $producto->pcs_inner_box = $data['pcs-empaque-interno'];
        $producto->pcs_ctn = $data['pcs-carton'];
        $producto->ctn_packing_size_l = $data['largo-carton'];
        $producto->ctn_packing_size_h = $data['alto-carton'];
        $producto->ctn_packing_size_w = $data['ancho-carton'];
        $producto->cbm = $data['cbm'];
        $producto->n_w_ctn = $data['peso-neto'];
        $producto->g_w_ctn = $data['peso-bruto'];
        $producto->total_cbm = $data['total-cbm'];
        $producto->total_n_w = $data['total-peso-neto'];
        $producto->total_g_w = $data['total-peso-bruto'];
        $producto->total_ctn = $data['total-ctn'];
        $producto->corregido_total_pcs = $data['corregido-total-pcs'];

        $producto->save();


        // dd($request->all());

        return redirect()->action('ProductoController@index', compact('id_proveedor'));

    }

    public function edit(Producto $producto)
    {
        
        return view('producto.edit', compact('producto'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producto $producto)
    {
        $data = $request->validate([
            'name' => 'required',
            'marca' => 'required',
            'codigo' => 'required',
            'codigo-hs' => 'required',
            'descripcion' => 'required',
            'vida-util' => 'required|numeric',
            'totalpcs' => 'required|numeric',
            'pcs-empaque-unitario' => 'required|numeric',
            'pcs-empaque-interno' => 'required|numeric',
            'pcs-carton' => 'required|numeric',
            'largo-carton' => 'required|numeric',
            'alto-carton' => 'required|numeric',
            'ancho-carton' => 'required|numeric',
            'cbm' => 'required|numeric',
            'peso-neto' => 'required|numeric',
            'peso-bruto' => 'required|numeric',
            'total-cbm' => 'required|numeric',
            'total-peso-neto' => 'required|numeric',
            'total-peso-bruto' => 'required|numeric',
            'total-ctn' => 'required|numeric',
            'corregido-total-pcs' => 'required|numeric',
        ]);
        $producto->proveedor_id = $request['proveedor_id'];
        $producto->product_name = $data['name'] ;
        $producto->brand = $data['marca'];
        $producto->product_code = $data['codigo'];
        $producto->hs_code = $data['codigo-hs'];
        $producto->description = $data['descripcion'];
        $producto->shelf_life = $data['vida-util'];
        $producto->total_pcs = $data['totalpcs'];
        $producto->pcs_unit = $data['pcs-empaque-unitario'];
        $producto->pcs_inner_box = $data['pcs-empaque-interno'];
        $producto->pcs_ctn = $data['pcs-carton'];
        $producto->ctn_packing_size_l = $data['largo-carton'];
        $producto->ctn_packing_size_h = $data['alto-carton'];
        $producto->ctn_packing_size_w = $data['ancho-carton'];
        $producto->cbm = $data['cbm'];
        $producto->n_w_ctn = $data['peso-neto'];
        $producto->g_w_ctn = $data['peso-bruto'];
        $producto->total_cbm = $data['total-cbm'];
        $producto->total_n_w = $data['total-peso-neto'];
        $producto->total_g_w = $data['total-peso-bruto'];
        $producto->total_ctn = $data['total-ctn'];
        $producto->corregido_total_pcs = $data['corregido-total-pcs'];
        $producto->save();
        return back()->with('message', 'Actualizado correctamente');

    }

    public function showImport($producto)
    {
        
        return view('producto.showImport',compact('producto'));
    }

    public function import(Request $request, $proveedor_id)
    {
        
        
        $request->validate([
            'file' => 'required'
         ]) ;
        
         $path = $request->file('file');
         
         $archivos = file($path);
         $archivos = file($path);
         $producto = "" ;
         $data = $this->convert_from_latin1_to_utf8_recursively($archivos);
         $utf8_archivos = array_map('utf8_decode', $data);
         $array =  array_map('str_getcsv', $utf8_archivos); 
           /* return response()->json($request); *//* $array; */  
         
         for($i = 1 ; $i < sizeof($array) ; $i++)
         {
            
            $producto = new Producto();
            $producto->proveedor_id        = $proveedor_id;
            $producto->hs_code             = $this->convertidor($array[$i][0]);   
            $producto->product_code        = $this->convertidor($array[$i][1]);
            $producto->brand               = $this->convertidor($array[$i][2]);
            $producto->product_name        = $this->convertidor($array[$i][3]);
            $producto->description         = $this->convertidor($array[$i][4]);
            $producto->shelf_life          = $this->convertidor($array[$i][5]);
            $producto->total_pcs           = $this->convertidor($array[$i][6]);
            $producto->pcs_unit            = $this->convertidor($array[$i][7]);
            $producto->pcs_inner_box       = $this->convertidor($array[$i][8]);
            $producto->pcs_ctn             = $this->convertidor($array[$i][9]);
            $producto->ctn_packing_size_l  = $this->convertidor($array[$i][10]);
            $producto->ctn_packing_size_w  = $this->convertidor($array[$i][11]);
            $producto->ctn_packing_size_h  = $this->convertidor($array[$i][12]);
            $producto->cbm                 = $this->convertidor($array[$i][13]);
            $producto->n_w_ctn             = $this->convertidor($array[$i][14]);
            $producto->g_w_ctn             = $this->convertidor($array[$i][15]);
            $producto->total_ctn           = $this->convertidor($array[$i][16]);
            $producto->corregido_total_pcs = $this->convertidor($array[$i][17]);
            $producto->total_cbm           = $this->convertidor($array[$i][18]);
            $producto->total_n_w           = $this->convertidor($array[$i][19]);
            $producto->total_g_w           = $this->convertidor($array[$i][20]); 
            $producto->created_at          = Carbon::now();  
            $producto->save();  
         }

         return response()->json($proveedor_id);

         return back()->with('message', 'datos guardados correctamente'); 

         
         

    }

    public function convertidor($remplazar)
    {
        
        
       
       
            
            $resultado = str_replace(",", ".", $remplazar);
            return $resultado;
       
      
     
    }
    public  function convert_from_latin1_to_utf8_recursively($dat)
    {
       if (is_string($dat)) {
          return utf8_encode($dat);
       } elseif (is_array($dat)) {
          $ret = [];
          foreach ($dat as $i => $d) $ret[ $i ] = self::convert_from_latin1_to_utf8_recursively($d);
 
          return $ret;
       } elseif (is_object($dat)) {
          foreach ($dat as $i => $d) $dat->$i = self::convert_from_latin1_to_utf8_recursively($d);
 
          return $dat;
       } else {
          return $dat;
       }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        //
    }
}
