<template>
    <v-container>
        <v-layout row wrap>
            <v-expansion-panel expand focusable >
                <v-container >
                    <v-layout row v-for="Header in Headers" primary--text font-weight-black>
                        <div class="ml-5"></div>
                        <v-flex ml-4>
                            {{ Header.date }}
                        </v-flex>
                        <v-flex >
                            {{ Header.title }}
                        </v-flex>
                        <v-flex >
                            {{ Header.price }}
                        </v-flex>
                        <v-flex >
                            {{ Header.seller }}
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-expansion-panel-content
                    expand-icon="cached"
                    v-for="(amulet,i) in amulets" :key="amulets.id">
                <template v-slot:header>
                    <v-layout row primary--text align-center>
                        <div>
                            {{ i + 1 }}.
                        </div>
                        <div class="ml-1">
                            <v-flex>
                                <v-card>
                                    <v-img :src='amulet.linkImg' width="45px" height="40px"></v-img>
                                </v-card>
                            </v-flex>
                        </div>
                        <v-flex ml-1>
                            {{ amulet.date | date}}
                        </v-flex>
                        <v-flex>
                            {{ amulet.namePra }}
                        </v-flex>
                        <v-flex>
                            {{ amulet.price }}
                        </v-flex>
                        <v-flex>
                            {{ amulet.seller }}
                        </v-flex>
                    </v-layout>
                </template>
                <v-card>
                    <v-layout row >
                        <v-layout column>
                            <v-container >
                                <v-flex >
                                    <v-card>
                                        <v-img :src='amulet.linkImg' ></v-img>
                                    </v-card>
                                </v-flex>
                            </v-container>
                        </v-layout>
                        <v-layout column primary--text>
                            <v-container >
                                <v-flex title left>
                                    {{ amulet.nameModel }}
                                </v-flex>
                                <v-flex >
                                    {{ amulet.nameYear }}
                                </v-flex>
                                <v-flex >
                                    {{ amulet.namePra }}
                                </v-flex>
                                <v-flex >
                                    {{ amulet.nameTemple }}
                                </v-flex>
                                <v-flex >
                                    {{ amulet.subDistrict }}
                                </v-flex>
                                <v-flex >
                                    {{ amulet.district }}
                                </v-flex>
                                <v-flex >
                                    {{ amulet.province }}
                                </v-flex>
                                <v-flex >
                                    {{ amulet.category }}
                                </v-flex>
                                <v-flex>
                                    รายละเอียด :
                                    <v-text-field
                                        outline
                                    ></v-text-field>
                                </v-flex>
                            </v-container>
                        </v-layout>
                    </v-layout>
                </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            Headers : [
            { date: 'วันที่เช่า', title: 'รายการ', price: 'ราคา', seller: 'ผู้ให้เช่า'}],
        }
    },
    computed: {
        amulets () {
            return this.$store.getters.loadedAmulets
        }
    }
}
</script>
