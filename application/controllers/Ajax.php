<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ajax extends CI_Controller {

	public function index()
	{
		redirect( base_url() );
	}

	public function tabledata()
	{
		$postData = $this->input->post();
    $query['like'] = ['user_fullname', 'user_id', 'user_birthday'];
    $query['where'] = [
      ['key' => 'user_status', 'value' => '1']
    ];
    $data = $this->dtable->getData('users', $query, $postData);
    echo json_encode($data);
	}
}
