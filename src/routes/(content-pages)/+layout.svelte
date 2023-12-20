<script>
    import Header from "../../components/header.svelte"
    import Footer from "../../components/footer.svelte"
</script>


<Header ifMain={false}/>
    <div class="loaderIndentation">
        <slot></slot>
    </div>
<Footer/>


<style>
    @media (min-width: 350px) and (max-width: 450px){
        .loaderIndentation{
            margin-top: 52px;
        }
    }
</style>