<script>
    import Header from "../components/header.svelte"
    import Footer from "../components/footer.svelte"
</script>


<Header ifMain={false}/>
<div class="page">
    <div class="errContent">
        <p class="errMessage">Извините, что-то пошло не так. Попробуйте позже.</p>
    </div>
</div>
<Footer/>

<style>
    @media(min-width: 350px) and (max-width: 1023px) {
        .errContent{
            margin-top: 56px;
            margin-bottom: 10px;
        }
    }
    .page{
        margin: 0;
        display: flex;
        width: 100%;
        height: auto;
        min-height: 30vh;
        text-align: center;
        justify-content: center;
    }
    .errContent{
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    p.errMessage{
        margin: 0;
        color: #7a8999;
        font-family: inherit;
        font-weight: 600;
        font-size: 42px;
    }
</style>




