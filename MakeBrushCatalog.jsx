// ---------------------------------------------------
// Using the top layer, creates a series of rectangles (set Height, Width, padding,
// in User Variables section below), and applies each brush
// in the current document to a rectangle.  Then, adds a label for
//  each brush in the middle of the rectangle.
// Created 20171202 | Updated 20121202 | oneDegreeMediaGroup (odmg.us)

//#### NOTE:  Detailed Pattern and Art brushes can take a few moments.

//------ User Variables --------
var yPos = 0;  // starting vertical position of 1st rectangle
var xPos = 0;  //  starting horizontal position of 1st rectangle
var width = 200; // rectangle width
var height = 100; // rectangle height
var padding = 20;  //space between each rectangle, both horizontally and vertically
var cols = 5;  // number of columns of rectangles to make (creates across, then down)

// -----END User Variables

var doc = app.activeDocument;
var artLayer = doc.layers[0];
var loop = doc.brushes.length;

for (i=0; i<loop; i++){
   
   if (i % cols==0) {  // if this is the first rectangle in a row, horizontal position is unchanged
        newxPos = xPos;
        newyPos = yPos - (Math.floor(i/cols)*(height+padding))-padding;
        } 
    else { // if not the first in a row, offset X by correct width
        newxPos = xPos + ((i%cols)*(width + padding));
        newyPos = yPos - (Math.floor(i/cols)*(height+padding))-padding;
    }
    // create the rectangle
   var rect = artLayer.pathItems.rectangle(newyPos,newxPos, width, height);
   thisBrush = doc.brushes[i]; //pick the right brush
   thisBrush.applyTo(rect);  //apply the current brush
    // create a pointText item in the vertical middle of the rectangle, 20pt left margin   
   var brushtext = doc.textFrames.pointText([newxPos + 20,newyPos - (height/2)] );
    brushtext.contents = thisBrush.name;
}
