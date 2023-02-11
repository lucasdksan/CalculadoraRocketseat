const areaCalculation = $(".area-calculation");

function selectOperation(key){
    switch(key){
        case "div":
            return `
                <span data-key="${key}" class="steps funct">/</span>
            `;
        case "mult":
            return `
                <span data-key="${key}" class="steps funct">*</span>
            `;
        case "minus":
            return `
                <span data-key="${key}" class="steps funct">-</span>
        `;
        case "plus":
            return `
                <span data-key="${key}" class="steps funct">+</span>
            `;
        break;
    }
}

function calculationCal(key, Fvalue, Lvalue){
    let firstValue = parseFloat(Fvalue);
    let lastValue = parseFloat(Lvalue);

    if(`${Fvalue}`.includes(",")){
        var aux = `${Fvalue}`.replace(",",".");
        firstValue = parseFloat(aux);
    }
    
    if(`${Lvalue}`.includes(",")){
        var auxL = `${Lvalue}`.replace(",",".");

        console.log("Aqui: ", auxL);

        lastValue = parseFloat(auxL);
    }

    switch(key){
        case "div":
            return firstValue / lastValue;
        case "mult":
            return firstValue * lastValue;
        case "minus":
            return firstValue - lastValue;
        case "plus":
            return firstValue + lastValue;
        case "por":
            return Fvalue / 100;
        break;
    }
}

$("button.number").on("click", function(){
    const stepsExists = $(areaCalculation).find(".steps");
    const stepsExistsNext = $(".steps.next");
    const stepsExistsFunct = $(".steps.funct");
    const valAux = $(stepsExists).text();
    const valAuxNext = $(stepsExistsNext).text();
    const val = $(this).val();

    if(stepsExists.length === 0 && stepsExistsNext.length === 0){
        $(areaCalculation).append(`
            <span class="steps">${val}</span>
        `);
    } else if(stepsExistsNext.length === 0 && stepsExistsFunct.length === 0) {
        $(stepsExists).text(`${valAux}${val}`);
    } else if(stepsExistsNext.length === 0 && stepsExistsFunct.length !== 0) {
        console.log(stepsExistsNext)

        $(areaCalculation).append(`
            <span class="steps next">${val}</span>
        `);
    } else {
        $(stepsExistsNext).text(`${valAuxNext}${val}`);
    }
});

$("button.funct").on("click", function(){
    const stepsExistsFunct = $(areaCalculation).find(".steps.funct");
    const val = $(this).val();

    if(stepsExistsFunct.length === 0){
        $(areaCalculation).append(selectOperation(val));
    }
});

$("#ce").on("click", function(){
    $(areaCalculation).empty();
    $(".result").text("0");
});

$("#c").on("click", function(){
    const firstBlock = $("span.steps").not(".next").not(".funct");
    const nextBlock = $("span.next");
    const functBlock = $("span.funct");

    const firstVal = $(firstBlock).text();
    const nextVal = $(nextBlock).text();

    if(firstBlock.length !== 0 && nextBlock.length !== 0 && functBlock.length !== 0){
        if(nextVal == ""){
            $(".steps.next").remove();
        }
        var str = `${nextVal}`;
        let auxNext = `${nextVal}`.substring(0, str.length - 1);
        nextBlock.text(auxNext);
    } else if(firstBlock.length !== 0 && nextBlock.length === 0 && functBlock.length !== 0){
        $(functBlock).remove();
    } else if(firstBlock.length !== 0 && nextBlock.length === 0 && functBlock.length === 0) {
        var str = `${firstVal}`;
        let auxFirst = `${firstVal}`.substring(0, str.length - 1);
        firstBlock.text(auxFirst);
    }
});

$("#equal").on("click", function(){
    const firstBlock = $("span.steps").not(".next").not(".funct");
    const nextBlock = $("span.next");
    const functBlock = $("span.funct");


    const firstVal = $(firstBlock).text();
    const nextVal = $(nextBlock).text();
    const functDataKey = $(functBlock).attr("data-key");

    let result = calculationCal(functDataKey, firstVal, nextVal);

    $("span.result").text(result);
});

$("#point").on("click", function(){
    const firstBlock = $("span.steps").not(".next").not(".funct");
    const nextBlock = $("span.next");

    const valAux = $(firstBlock).text();
    const valAuxNext = $(nextBlock).text();

    if(firstBlock.length !== 0 && nextBlock.length !== 0){
        $(nextBlock).text(`${valAuxNext},`);
    } else {
        $(firstBlock).text(`${valAux},`);
    }
});

$("#por").on("click", function(){
    const firstBlock = $("span.steps").not(".next").not(".funct");
    const firstVal = $(firstBlock).text();

    let result = calculationCal("por", firstVal, 0);

    if(firstVal.length !== 0){
        $("span.result").text(result);
    }
});

$("#minplus");on("click", function(){
    
});