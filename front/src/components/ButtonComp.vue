<template>
    <body>
        
        <div class="card-container">
            <div class="card">
                <img class="img_cont" src="content.image">
                <div class="card-content">
                    <h3>Titulo</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta corrupti qui aut sit alias quaerat
                        deleniti cupiditate est laudantium voluptates.</p>
                    <a href="">Leer mas</a>
                </div>
            </div>
        </div>

    </body>
</template>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        background-color: #f0f0f0;
    }

    .card-container{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .card {
        width: 325px;
        background-color: #f0f0f0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        margin: 20px;
    }
    .card img{
        width: 100%;
        height: auto;
    }
    .card-content{
        padding: 16px;
    }
    .card-content h3{
        font-size: 28px;
        margin-bottom: 8px;
    }
    .card-content p{
        color: #666;
        font-size: 15px;
        line-height: 1.3;
    }

    .card-conten .btn{
        display: inline-block;
        padding: 0px 16px;
        background-color: #333;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 16px;
        color: #fff;
    }
</style>