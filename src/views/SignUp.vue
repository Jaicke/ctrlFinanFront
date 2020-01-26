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
          <li v-for="error in messageErrors" :key="error">{{error}}</li>
        </v-alert>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">Registrar-se</v-list-item-title>
            <v-list-item-subtitle>Bem-vindo</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            label="Nome de Usuário"
            required
            autofocus
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            label="E-mail"
            required
          ></v-text-field>
          
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Senha"
            hint="Ao menos 8 caracteres"
            counter
            @click:append="show = !show"
          ></v-text-field>

         <v-text-field
            v-model="passwordConfirmation"
            :append-icon="showConf ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showConf ? 'text' : 'password'"
            name="input-10-1"
            label="Confirmação de Senha"
            hint="Ao menos 8 caracteres"
            counter
            @click:append="showConf = !showConf"
          ></v-text-field>
          
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn to="/signin" text>Entrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="signUp">Registrar</v-btn>
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
      email: '',
      password: '',
      passwordConfirmation: '',
      withError: false,
      messageErrors: null,
      show: false,
      showConf: false,
      rules: {
        required: pass => !!pass || 'Obrigatório',
        min: pass => pass.length >= 8 || 'Mínimo 8 caracteres'
      }
    }
  },
  methods: {
    signUp(){
      api.post('/users',
            {username: this.username, email: this.email, password: this.password, password_confirmation: this.passwordConfirmation})
           .then((response) => {
             window.console.log(response)
            this.withError = false
            this.$router.replace({ name: "signin" });
           }).catch(error => {
            this.withError = true
            this.messageErrors = error.response.data.errors
          });
    }
  }
}
</script>

<style scoped>
  li{
    list-style: none;
  }
</style>
