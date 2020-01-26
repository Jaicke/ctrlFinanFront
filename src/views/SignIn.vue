<template>
   <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-alert
          border="left"
          colored-border
          type="error"
          elevation="2"
          v-if="withError">
          {{ messageError }}
        </v-alert>

        <v-list-item>
          <v-avatar>
            <img
              src="https://avatars2.githubusercontent.com/u/38104697?s=460&v=4"
              alt="Profile"
            >
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">Login</v-list-item-title>
            <v-list-item-subtitle>Bem-vindo de volta</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-text-field
            ref="username"
            v-model="username"
            :rules="[rules.required]"
            label="Nome de Usuário"
            required
            autofocus
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Senha"
            @click:append="show = !show"
          ></v-text-field>

        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn to="/signup" text>Registrar-se</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="signIn">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import api from '@/service'
export default {
  data(){
    return{
      username: '',
      password: '',
      withError: false,
      show: false,
      messageError: '',
      rules: {
        required: pass => !!pass || 'Obrigatório',
        min: pass => pass.length >= 8 || 'Mínimo 8 caracteres'
      }
    }
  },
  methods: {
    signIn(){
      api.post('/auth/login', { username: this.username, password: this.password })
          .then(() => {
            this.withError = false
            this.$router.replace({ name: "home" });
          }).catch(error => {
            this.withError = true
            this.messageError = error.response.data.error
          });
    }
  }
}
</script>

<style scoped>

</style>
