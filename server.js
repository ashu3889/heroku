var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

//setup mongoose connection
var mongoose= require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ashu3889:amma2011@ds161410.mlab.com:61410/pagination');

var db = mongoose.connection;

//now use mongoose to create a mongoose schema

var listSchema = mongoose.Schema({
	 name:  String,
     sref:  String
});

var paginationSchema = mongoose.Schema({
	 name:  String,
     email:  String,
	 age : Number
});

var listModel = mongoose.model('listMod' , listSchema);

var paginationModel = mongoose.model('paginationMod' , paginationSchema);




//post data on first time
/*paginationModel.create(dummydata, function(err, docs){
	 if(err){		
		 console.log('data save error' + err);
	 }
	 else{
	 console.log('data save successfull');		
	 }

}) */

//express app setup default router
/*app.get('/' , function(req, res){
	
	res.send('hello world');
});*/


// get router to get employee data based on name
app.get('/:name' , function(req, res){
	var empName = req.params.name;

listModel.find({name :empName} , function(err, docs){
	if(err){
		console.log('error occurs');
	}
	else{
		res.send(docs);
	}	
})	
	
});

//default router called on page load to load list
app.get('/' , function(req, res){	
console.log('default route called');
listModel.find(function(err, docs){
	if(err){
		console.log('error occurs');
	}
	else{
		 res.json({ message: 'doc updated!' , docum : doc });
	}	
})	
	
});

//setup angular Router
var router = express.Router();


 router.route('/:name').put(function(req, res) {
  
    var findname = req.params.name;
	var updatename = req.body.newname;
	
	console.log('call hua bhai');
 
    listModel.findById(req.params.name,function(err, doc){
		if(err){
		console.log('error occurs');
	    }
		else{
			 console.log('doc doc name' +  doc);
			doc.name = updatename;
			
			 console.log('doc doc name' +  doc.name);
			//save the docs
					 // save the doc
             doc.save(function(err) {
                 if (err)
                     res.send(err);

                 res.json({ message: 'doc updated!' , docum : doc });
             });	
			
		}
		
	})
  
  });
  
  router.get('/about', function(req, res){
	  
	  console.log("about call called ashutosh");
      listModel.find(function(err, doc){
		if(err){
		console.log('error occurs');
	    }
		else{
			console.log('success occurs');
			 res.json({ message: 'doc updated!' , docum : doc });	
		}		
	})  
});


  router.get('/pagination', function(req, res){
	  
	  console.log("about call called ashutosh");
      paginationModel.find(function(err, doc){
		if(err){
		console.log('error occurs');
	    }
		else{
			console.log('success occurs');
			 res.json({ message: 'doc updated!' , docum : doc });	
		}		
	})  
});

  
  /*router.route('/').get(function(req, res) {  
   alert('here');
   employeeModel.find({"name" :"Rohan"},function(err, doc){
		if(err){
		console.log('error occurs');
	    }
		else{
			console.log('success occurs');
			 res.json({ message: 'doc updated!' , docum : doc });	
		}		
	})  
  });*/
  

app.use('/api' , router);

//var port  = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, function(){
	
	console.log('express app setup complete');
});