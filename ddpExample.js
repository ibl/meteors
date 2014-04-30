
//connects to a a vcf meteor app running at 3000 port 
//you could clone it 
// https://github.com/diegopenhanut/vcf/tree/testing/vcfMeteor
var local = DDP.connect('http://localhost:3000/');

//connects to vcf meteor app running at meteor.com
var remote = DDP.connect('http://vcf.meteor.com/');

//create LocalHead and Head collections that equals head 
//collections on local and remote
    LocalHead = new Meteor.Collection('head', local);
    Head = new Meteor.Collection('head', remote);
//subscribe to those collections. Targer Apps must publish it.
//we don't care about it why those apps uses autopublish package.
//This probably won't be the case on production apps.

    local.subscribe('head', function() {
  var localhead = LocalHead.find();
});
    remote.subscribe('head', function() {
  var head = Head.find();
});
//you could access Head and LocalHead collections on console

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    //counts total docs on local and remote and display on a template
    var cloudTotalDocs=Head.find().count(); 
    var localTotalDocs=LocalHead.find().count();
    var response = "You have "+cloudTotalDocs+" docs on cloud and " +localTotalDocs+" on localhost";
    return response;
  };


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
