<?php

Class Dtable_model extends CI_Model {

	public function getData($table_name='', $query=[], $postData=null)
    {
		if ($postData == null || $table_name=='' || count($query) == 0) {
            return [
                'draw' => 0,
                'iTotalRecords' => 0,
                'iTotalDisplayRecords' => 0,
                'aaData' => [],
            ];
        }

        $response = [];

     	$draw = $postData['draw'];
     	$start = $postData['start'];
     	$rowperpage = $postData['length'];
     	$columnIndex = $postData['order'][0]['column'];
     	$columnName = $postData['columns'][$columnIndex]['data'];
     	$columnSortOrder = $postData['order'][0]['dir'];
     	$searchValue = $postData['search']['value'];

     	$searchQuery = "";
     	if($searchValue != ''){
     		$searchQuery = " (";
     		$x = 0;
     		foreach ($query['like'] as $like) {
     			if ($x > 0) {
     				$searchQuery .= "or ";
     			}
     			$searchQuery .= $like." like '%".$searchValue."%' ";
     			$x++;
     		}
        	$searchQuery .= " ) ";
     	}

     	$this->db->select('count(*) as allcount');
     	if (array_key_exists('where', $query)) {
     		foreach ($query['where'] as $where) {
     			$this->db->where($where['key'], $where['value']);
     		}
     			
     	}
     	$records = $this->db->get($table_name)->result();
     	$totalRecords = $records[0]->allcount;

     	$this->db->select('count(*) as allcount');
     	if($searchQuery != '')
        	$this->db->where($searchQuery);
     	if (array_key_exists('where', $query)) {
     		foreach ($query['where'] as $where) {
     			$this->db->where($where['key'], $where['value']);
     		}
     	}
     	$records = $this->db->get($table_name)->result();
     	$totalRecordwithFilter = $records[0]->allcount;

     	$this->db->select('*');
     	if($searchQuery != '')
        	$this->db->where($searchQuery);
     	if (array_key_exists('where', $query)) {
     		foreach ($query['where'] as $where) {
     			$this->db->where($where['key'], $where['value']);
     		}
     	}
     	$this->db->order_by($columnName, $columnSortOrder);
     	if ($rowperpage != -1) {
            $this->db->limit($rowperpage, $start);
        }
     	$records = $this->db->get($table_name)->result();

     	$data = [];

     	foreach ($records->result_array() as $row) {
     		$singleData = [];
     		foreach ($row as $k => $v) {
     			$singleData[$k] = $v;
     		}
     		$data[] = $singleData;
     	}

     	$response = [
        	"draw" => intval($draw),
        	"iTotalRecords" => $totalRecords,
        	"iTotalDisplayRecords" => $totalRecordwithFilter,
        	"aaData" => $data,
     	];
     	
     	if ($this->config->item('dtable_csrf')) {
     		$response[$this->security->get_csrf_token_name()] = $this->security->get_csrf_hash();
     	}

     	return $response;
	}

}
