<?php
    header('Content-type: application/json');
    
    $filename = preg_replace(array('/\s/', '/\.[\.]+/', '/[^\w_\.\-]/'), array('_', '.', ''), $_GET["file"]);
    $fileContents = file_get_contents($filename);

    if (!$fileContents) {
        $fileContents = file_get_contents("md/$filename");
    }

    $jsonArray["content"] = $fileContents;
    echo json_encode($jsonArray);
    
    #echo($fileContents);
?>