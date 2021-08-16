<?php

namespace App\Imports;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Events\AfterImport;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class ProductosImport implements WithStartRow, WithCalculatedFormulas
{
    public function __construct(Request $request)
    {
        //Load file from request
        $this->excel = IOFactory::load($request->file('import'));
        //Get active sheet
        $this->sheet = $this->excel->getActiveSheet();
    }

    public function importarImagenes()
    {
        // $drawings = $this->sheet->getDrawingCollection();
        // $cantidad = count($drawings);

        // error_log("Se encontraron $cantidad imagenes");

        // foreach ($drawings as $drawing) {
        //     //check if it is instance of drawing
        //     if ($drawing instanceof Drawing) {

        //         error_log("es valida");
        //         // //creating image name with extension
        //         // $file_name = str_replace(' ', '_', $drawing->getName()) . '.' . $drawing->getExtension();
        //         // //Get image contents from path and store them in Laravel storage
        //         // Storage::put('public/' . $file_name, file_get_contents($drawing->getPath()));
        //         // //create images array initially
        //         // $this->excel_data[] = [
        //         //     'image' => $file_name,
        //         // ];
        //     }
        // }
    }

    public function registerEvents(): array
    {
        return [
            AfterImport::class => function (AfterImport $event) {
                error_log("After Import");

                $reader = $event->getReader();
                $sheet = $reader->getActiveSheet();

                $i = 0;

                $drawings = $sheet->getDrawingCollection();
                error_log(count($drawings));

                foreach ($sheet->getDrawingCollection() as $drawing) {
                    // if ($drawing instanceof \PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing) {
                    //     ob_start();
                    //     call_user_func(
                    //         $drawing->getRenderingFunction(),
                    //         $drawing->getImageResource()
                    //     );
                    //     $imageContents = ob_get_contents();
                    //     ob_end_clean();
                    //     switch ($drawing->getMimeType()) {
                    //         case \PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing::MIMETYPE_PNG:
                    //             $extension = 'png';
                    //             break;
                    //         case \PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing::MIMETYPE_GIF:
                    //             $extension = 'gif';
                    //             break;
                    //         case \PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing::MIMETYPE_JPEG:
                    //             $extension = 'jpg';
                    //             break;
                    //     }
                    // } else {
                    //     $zipReader = fopen($drawing->getPath(), 'r');
                    //     $imageContents = '';
                    //     while (!feof($zipReader)) {
                    //         $imageContents .= fread($zipReader, 1024);
                    //     }
                    //     fclose($zipReader);
                    //     $extension = $drawing->getExtension();
                    // }

                    // $myFileName = '00_Image_' . ++$i . '.' . $extension;
                    // file_put_contents($myFileName, $imageContents);
                    error_log('00_Image_' . ++$i);
                }

            },
        ];
    }

    public function startRow(): int
    {
        return 4;
    }
}
