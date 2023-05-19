<template>
    <div style="margin-left: 150px">
        <v-row>
            <v-col>
                <h1>{{ datas[0].title}}</h1><br>
                <img :src="datas[0].thumbnail" height="500px">
                <p size="30px">{{ datas[0].short_description }}</p>
                <br>
                <p size="30px">Genre: {{ datas[0].genre }}</p>
                <v-btn :href="datas[0].game_url">Go to {{datas[0].title}} Website</v-btn>
            </v-col>
            <div style="margin-right: 200px">
            <v-col style="margin-top: 85px " >
                <v-col><v-btn color="secondary">Buy Now</v-btn></v-col>
                <v-col><v-btn color="secondary">Add to cart</v-btn></v-col>
                <v-col><v-btn color="secondary">Add to wishlist</v-btn></v-col>
                <v-col>Developer: {{ datas[0].developer }}</v-col>
                <v-col>Publisher: {{ datas[0].publisher }}</v-col>
                <v-col>Release Date: {{ datas[0].release_date }}</v-col>
                <v-col>Platform: {{ datas[0].platform }}</v-col>
            </v-col>
        </div>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            datas: [],
            id: '',
        }
    },
    created(){
        this.id = this.$route.params.id;
    },
    async asyncData({ $axios, params }) {
        if(localStorage.getItem('Data')){
            const data2 = JSON.parse(localStorage.getItem('Data'));
            const filteredData = data2.filter(key => key.id === Number(params.id));
            return { datas: filteredData };
        }else{
            const { data } = await $axios.get("/api/api1/games");
            console.log(data);
            const filteredData = data.filter(key => key.id === Number(params.id));
            return { datas: filteredData };
        }
    },
    /* async mounted(){
        this.id = this.$route.params.id;
        const {data} = await this.$axios.get("https://www.mmobomb.com/api1/games")
        this.datas = data.filter(key=>
            key.id===Number(this.id));
    } */
}
</script>
