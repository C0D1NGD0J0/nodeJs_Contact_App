function get(){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/contacts',
		dataType: 'json'
	})
	.done((data) =>{
		console.log('GET response:', JSON.stringify(data, '', 2));

		$('#dataContactId').html(data.contactId);
		$('#dataF_Name').html(data.firstName);
		$('#dataL_Name').html(data.lastName);
		$('#dataEmail').html(data.email);
		$('#dataPhone').html(data.phone);
	})
	.fail((jqXHR, textStatus, err) =>{
		console.log('Ajax error response:', textStatus);
	});
}

function post(){
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/contacts',
		crossDomain: true,
		contentType: 'application/json; charset=utf',
		dataType: 'json',
		data: JSON.stringify({
			contactId: 2,
			firstName: 'Chris',
			lastName: 'Brown',
			email: 'chris@brown.com',
			phone: '22233344'
		})
	})
	.done((data) =>{
		console.log('POST response:', JSON.stringify(data, '', 2));
		$('#dataContactId').html(data.contactId);
		$('#dataF_Name').html(data.firstName);
		$('#dataL_Name').html(data.lastName);
		$('#dataEmail').html(data.email);
		$('#dataPhone').html(data.phone);
	})
	.fail((jqXHR, textStatus, err) =>{
		console.log('Ajax error response:', textStatus);
	});
}

function put(){
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/contacts/1',
		crossDomain: true,
		contentType: 'application/json; charset=utf',
		dataType: 'json',
		data: JSON.stringify({
			contactId: 2,
			firstName: 'Chris',
			lastName: 'Brown',
			email: 'chris@brown.com',
			phone: '11155566'
		})
	})
	.done((data) =>{
		console.log('PUT response:', JSON.stringify(data, '', 2));
		$('#dataContactId').html(data.contactId);
		$('#dataF_Name').html(data.firstName);
		$('#dataL_Name').html(data.lastName);
		$('#dataEmail').html(data.email);
		$('#dataPhone').html(data.phone);
	})
	.fail((jqXHR, textStatus, err) =>{
		console.log('Ajax error response:', textStatus);
	});
}

function del(){
	$.ajax({
		type: 'DELETE',
		url: 'http://localhost:3000/contacts/1',
		dataType: 'json',
	})
	.done((data) =>{
		console.log('DELETE response:', JSON.stringify(data, '', 2));
		$('#getResponse').html(JSON.stringify(data, '', 2));
	})
	.fail((jqXHR, textStatus, err) =>{
		console.log('Ajax error response:', textStatus);
	});
}