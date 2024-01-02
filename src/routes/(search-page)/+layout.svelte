<script>
    import Header from "../../components/header.svelte"
    import Footer from "../../components/footer.svelte"
</script>


<Header ifMain={false}/>
<div class="page">
    <slot></slot>
</div>
<Footer/>

<style>
    .page{
        margin: 16px auto 16px;
        padding: 16px;
        width: 90%;
        min-height: 25vh;
        max-width: 992px;
        height: auto;
        background-color: #fefeff;
        box-shadow: #00000036 0px 1px 6px, #00000036 0px 1px 4px;
        border-radius: 4px
    }
    @media (min-width: 300px) and (max-width: 499px){
        .page{ 
            margin: 52px auto 16px;
        }
    }
</style>