<script>
    import Header from "../../components/header.svelte"
    import Footer from "../../components/footer.svelte"
</script>


<Header ifMain={false}/>
<div>
    <slot></slot>
</div>
<Footer/>

<style>
    div{
        padding-top: 12px;
    }
</style>