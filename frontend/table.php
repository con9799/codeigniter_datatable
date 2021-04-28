<!DOCTYPE html>
<html>
<head>
	<title>Sample table</title>
	<link rel="stylesheet" type="text/css" href="datatables/dataTables.bootstrap4.min.css">
	<link rel="stylesheet" type="text/css" href="datatables/buttons.bootstrap4.min.css">
	<link rel="stylesheet" type="text/css" href="datatables/responsive.bootstrap4.min.css">
</head>
<body>
	<?php
		if ($this->config->item('dtable_csrf')) {
	?>
			<input type="hidden" name="<?php echo $this->security->get_csrf_token_name();?>" value="<?php echo $this->security->get_csrf_hash();?>">
	<?php
     	}
	?>
	<?php
		echo datatableGen(
			'tablename',
			[
				'class' => 'table table-striped m-0 table-actions-bar dt-responsive nowrapdt-head-right',
            	'id' => 'test',
            	'cellspacing' => '0',
            	'style' => 'width:100%;',
            ],
            [
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
            ]);
		?>

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

</body>
</html>
