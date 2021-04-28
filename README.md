# Codeigniter Datatable
Codeigniter frameworki uchun ajax datatable qo'shish

Talablar: 
	Codeigniterning 3dan yuqori versiyasi
	Jquery
	Bootsrap
	PHP: 5.4

Ishga tushirish:

1. Application papkasidagi barcha fayllar serverga ko'chiriladi.
	
2. application/config/autoload.php fayliga ushbu sozlamarla qo'shiladi
```$autoload['helper'] = array('dtable');```
```$autoload['config'] = array('dtable');```
```$autoload['model'] = array('dtable_model' => 'dtable');```
 
 3. Kerakli views fayliga ushbu css va javascript fayllar ko'rsatiladi
```html
<link rel="stylesheet" type="text/css" href="datatables/dataTables.bootstrap4.min.css">
<link rel="stylesheet" type="text/css" href="datatables/buttons.bootstrap4.min.css">
<link rel="stylesheet" type="text/css" href="datatables/responsive.bootstrap4.min.css">

<script type="text/javascript" src="datatables/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="datatables/dataTables.bootstrap4.min.js"></script>
<script type="text/javascript" src="datatables/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="datatables/buttons.bootstrap4.min.js"></script>
<script type="text/javascript" src="datatables/jszip.min.js"></script>
<script type="text/javascript" src="datatables/pdfmake.min.js"></script>
<script type="text/javascript" src="datatables/vfs_fonts.js"></script>
<script type="text/javascript" src="datatables/buttons.html5.min.js"></script>
<script type="text/javascript" src="datatables/buttons.print.min.js"></script>
<script type="text/javascript" src="datatables/buttons.colVis.min.js"></script>
<script type="text/javascript" src="datatables/dataTables.responsive.min.js"></script>
<script type="text/javascript" src="responsive.bootstrap4.min.js"></script>
<script type="text/javascript" src="table.js"></script>
```
4. Agarda csrf himoya yoqilgan bo'lsa application/config/dtable.php faylidan `$config["dtable_csrf"] = TRUE;` , application/config/config.php faylidan  `$config['csrf_protection'] = TRUE;` ga sozlanadi

Foydalanish:
```php
	<?php
		/*
			Jadval idenfikatori. Keyinchalik zarurat tug'ilganda jquerydan murojaat qilish uchun. Yoki jadval ma'lumotlarini qayta yuklash $dtables['smscontacts'].ajax.reload();
		*/
		$tablename = 'sampletable';

		/*
			Agarda jadvalga qo'shimcha atributlar kiritish lozim bo'lsa. Keraksiz holatda bo'sh qoldirilishi mumkin.
		*/
		$attr = [
			'class' => 'table table-striped m-0 table-actions-bar dt-responsive nowrapdt-head-right',
			'id' => 'test',
            'cellspacing' => '0',
            'style' => 'width:100%;',
		];
		/*
			ajax => url : Ma'lumotlarni yuklash manzili
			
			columns: massivida ajaxdan yuklanuvchi jadval ma'lumotlari ko'rsatiladi
			
			columnDefs: className => Kerakli qator uchun css class, targets: class aynan qaysi qatorlarga amal qilishi massivi

			order: Kerakli qator tartiblanishi

			lengthMenu: Qatorlar uzunligini sozlash

			buttons: QO'shimcha tugmalar massivi
				Ushbu massiv javascript funsiya yaratib olish uchun ishlatiladi.
					'customize' => [
						'arguments' => 'e, doc',
                    	'body' => "console.log(e)"
					]
				arguments kalitida funsiya argumentlari vergul asosida ko'rsatiladi
					Misol: e, doc;
				body kalitida funsiya ichki qismi ko'rsatiladi
					Misol: console.log(e)
				
		*/
		$setings = [
            	'processing' => true,
                'serverSide' => true,
                'serverMethod' => 'post',
                'ajax' => [
                	'url' => base_url('ajax/tabledata'),
                	'cache' => false
                ],
                'columns' => [
                	['title' => 'ID', 'data' => 'user_id'],
                    ['title' => 'Fullname', 'data' => 'user_fullname'],
                    ['title' => 'Tug\'ilgan sana', 'data' => 'user_birthday']
                ],
                'columnDefs' => [
                	['className' => 'text-center', 'targets' => [0, 1, 3, 4, 5]]
                ],
                'order' => [
                	[0, "asc"]
                ],
                'responsive' => false,
                'buttonsDom' => 'Bfrtip',
                "lengthMenu" => [[10, 25, 50, -1], ['10 dona', '25 dona', '50 dona', 'Barchasi']],
				'buttons' => [
                	[
                    	'text' => '<i class="fa fa-list-ol"></i> Yozuvlar',
                        'className' => 'btn-inverse',
                        'extend' => 'pageLength'
                    ],
                    [
                    	'text' => '<i class="fa fa-list"></i> Ustunlar',
                    	'className' => 'btn-inverse',
                        'extend' => 'colvis'
                    ],
                    [
                    	'extend' => 'collection',
                        'text' => '<i class="fa fa-file-text-o"></i> Eksport',
                        'className' => 'btn-inverse',
                        'buttons' => [
                        	[
                            	'extend' => 'print',
                                'text' => '<i class="fa fa-print"></i> Chop etish',
                                'exportOptions' => ['columns' => ':visible'],
                                'customize' => [
                                	'arguments' => 'win',
                                	'body' => "$(win.document.body).children(\"h1:first\").remove();"
                            	]
                        	],
                        	[
                            	'extend' => 'excel',
                                'text' => '<i class="fa fa-file-excel-o"></i> Excel',
                                'exportOptions' => ['columns' => ':visible']
                            ],
                            [
                            	'extend' => 'pdf',
                                'text' => '<i class="fa fa-file-pdf-o"></i> PDF',
                                'exportOptions' => ['columns' => ':visible'],
                                'customize' => [
                                	'arguments' => 'doc',
                                	'body' => "doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');"
								]
                            ],
							[
                            	'extend' => 'copy',
                                'exportOptions' => ['columns' => ':visible'],
                                'text' => '<i class="fa fa-copy"></i> Nusxalash'
                            ]
                        ]
                    ][
                    	'text' => '<i class="fa fa-plus"></i> Ma\'lumot qo\'shish',
                    	'className' => 'btn-custom',
                        	'action' => ['arguments' => 'e,dt,node,config', 'body' => 'console.log(e)']
                    ]
                ]
            ]
		echo datatableGen($tablename, $attr, $setings);
	?>
  ```
