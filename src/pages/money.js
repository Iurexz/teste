import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Alert } from 'react-native';
import axios from 'axios';

export default function SignUpScreen({ navigation }) {
  const [inputValues, setInputValues] = useState({
    name: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })

  const [error, setError] = useState({
    name: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    passNotEqual: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setInputValues({ ...inputValues, [field]: value })
    setError({ ...error, [field]: '' })
  }

  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, '')
    if (cleaned.length > 11) {
      return inputValues.phone // Não permite mais de 11 dígitos
    }
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{0,4})$/)
    if (match) {
      if (match[3]) {
        return `(${match[1]}) ${match[2]} -${match[3]}`
      } else {
        return ` (${match[1]}) ${match[2]}`
      }
    }
    return cleaned
  }

  const handlePhoneChange = (text) => {
    const formattedPhone = formatPhone(text)
    setInputValues({ ...inputValues, phone: formattedPhone })
    setError({ ...error, phone: '' })
  }

  const handleConfirmDate = (date) => {
    setShowDatePicker(false)
    setSelectedDate(date)
    handleChange('birthDate', formatDate(date))
  }




  const handleRegister = async () => {
    setLoading(true);
  
    // Verifica os inputs antes de enviar para o backend
    verifyInputs();
  
    // Caso não tenha erros
    if (Object.keys(error).length === 0) {
      try {
        const res = await axios.post('http://192.168.1.3:5500/cadastro', {
          nomeCompleto: inputValues.name,
          email: inputValues.email,
          senha: inputValues.password, // Envia a senha conforme necessário
          dataNasc: selectedDate,
          telefone: inputValues.phone
        });
  
        if (res.status === 201) {
          Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
          navigation.navigate('Login'); // Navega para a tela de login após sucesso
        }
      } catch (error) {
        alert(error.response?.data?.data || "Erro no cadastro, tente novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };









  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const verifyInputs = () => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
    let newError = {};
  
    if (!inputValues.name.trim()) {
      newError.name = "O nome é um campo obrigatório.";
    } else if (!nameRegex.test(inputValues.name)) {
      newError.name = "Nome inválido. Use apenas letras e acentuações.";
    }
  
    if (!inputValues.email.trim()) {
      newError.email = "O email é um campo obrigatório.";
    } else if (!emailRegex.test(inputValues.email)) {
      newError.email = "Email inválido.";
    }
  
    if (!inputValues.birthDate.trim()) {
      newError.birthDate = "A data de nascimento é um campo obrigatório.";
    }
  
    if (!inputValues.phone.trim()) {
      newError.phone = "O número de telefone é um campo obrigatório.";
    } else if (inputValues.phone.replace(/\D/g, '').length !== 11) {
      newError.phone = "O número de telefone deve conter 11 dígitos.";
    }
  
    if (!inputValues.password.trim()) {
      newError.password = "A senha é um campo obrigatório.";
    } else if (!passwordRegex.test(inputValues.password)) {
      newError.password = "A senha deve ter pelo menos 8 caracteres, incluindo 1 número, 1 letra e 1 símbolo.";
    }
  
    if (!inputValues.confirmPassword.trim()) {
      newError.confirmPassword = "É necessário confirmar a senha para prosseguir.";
    } else if (inputValues.confirmPassword !== inputValues.password) {
      newError.confirmPassword = "As senhas digitadas não coincidem!";
    }
  
    setError(newError);
  };

  return (
    <LinearGradient
      colors={['#124C3E', '#3D7E52', '#124C3E']}
      style={styles.container}
    >
      {/* Imagem de logo */}
      <Image source={require('../../assets/image/logo 2.png')} style={styles.image} />

      {/* Caixa branca de cadastro */}
      <View style={styles.signUpBox}>
        {/* Título */}
        <Text style={styles.title}>Crie sua Conta</Text>
        <Text style={styles.subtitle}>Faça sua conta Mind In Din e veja seu dindin render! 😉</Text>

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollBox}>

          {/* Campo Nome */}
          <View style={[styles.inputContainer, error.name ? styles.errorLine : null]}>
            <TextInput
              style={styles.input}
              placeholder="Seu nome..."
              value={inputValues.name}
              onChangeText={text => handleChange('name', text)}
            />
            <FontAwesome name="user" size={wp('6%')} color="black" />
          </View>
          {error.name ? <Text style={styles.errorText}>{error.name}</Text> : null}

          {/* Campo Email */}
          <View style={[styles.inputContainer, error.email ? styles.errorLine : null]}>
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail..."
              value={inputValues.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
            />
            <FontAwesome name="envelope" size={wp('6%')} color="black" />
          </View>
          {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

          {/* Campo Data de Nascimento */}
          <View style={[styles.inputContainer, error.birthDate ? styles.errorLine : null]}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{inputValues.birthDate || <Text style={{ color: '#898989', fontSize: wp('4%') }}>Selecione sua data de nascimento...</Text>}</Text>
            </TouchableOpacity>
            <FontAwesome name="calendar" size={wp('6%')} color="black" />
          </View>
          {error.birthDate ? <Text style={styles.errorText}>{error.birthDate}</Text> : null}

          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={selectedDate}
            onConfirm={handleConfirmDate}
            onCancel={() => setShowDatePicker(false)}
            maximumDate={new Date(2014, 11, 31)} // Define a data máxima como 31/12/2014
            minimumDate={new Date(1930, 0, 1)} // Define a data mínima como 01/01/1930
          />

          {/* Campo Telefone */}
          <View style={[styles.inputContainer, error.phone ? styles.errorLine : null]}>
            <TextInput
              style={styles.input}
              placeholder="Seu Telefone..."
              value={inputValues.phone}
              onChangeText={text => handlePhoneChange(text)}
              keyboardType="phone-pad"
            />
            <FontAwesome name="phone" size={wp('6%')} color="black" />
          </View>
          {error.phone ? <Text style={styles.errorText}>{error.phone}</Text> : null}

          {/* Campo Senha */}
          <View style={[styles.inputContainer, error.password ? styles.errorLine : null]}>
            <TextInput
              style={styles.input}
              placeholder="Sua senha..."
              value={inputValues.password}
              onChangeText={text => handleChange('password', text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={wp('6%')} color="black" />
            </TouchableOpacity>
          </View>
          {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

          {/* Campo Confirmar Senha */}
          <View style={[styles.inputContainer, error.confirmPassword ? styles.errorLine : null]}>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha..."
              value={inputValues.confirmPassword}
              onChangeText={text => handleChange('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={wp('6%')} color="black" />
            </TouchableOpacity>
          </View>
          {error.confirmPassword ? <Text style={styles.errorText}>{error.confirmPassword}</Text> : null}

          {/* Botão Continuar */}
          <TouchableOpacity style={styles.continueButton} onPress={handleRegister}>
          <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>


          {/* Termos de uso e política */}
          <Text style={styles.termsText}>
            Ao criar conta você concorda com nossos
            <Text style={styles.termsLink}> Termos de Uso </Text>e
            <Text style={styles.termsLink}> Políticas de Privacidade.</Text>
          </Text>

          {/* Botão Google */}
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/96/google-logo.png' }}
              style={styles.googleIcon}
            />
          </TouchableOpacity>

          {/* Link para login */}
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Fazer Login</Text>
          </Text>

        </ScrollView>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: wp('0%'),
  },
  image: {
    width: wp('30%'), // Diminui a largura da logo
    height: hp('10%'), // Diminui a altura da logo
    marginBottom: hp('1%'), // Ajusta a margem inferior
    marginTop: hp('10%'), // Ajusta a margem superior
    alignSelf: 'center',
  },
  signUpBox: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: wp('8%'),
    width: wp('100%'), // Ajusta a largura da caixa branca
    height: hp('100%'), // Ajusta a altura da caixa branca
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: hp('1%'), // Ajusta a margem superior
  },
  scrollBox: {
    flex: 0,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: hp("130%"),
    minHeight: hp("88%"),
    width: wp("80%"),
  },

  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#3D7E52',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: hp('1%'),
    paddingVertical: hp('1%'),
    width: '90%',
  },
  errorLine: {
    borderBottomColor: 'red',
  },
  input: {
    flex: 1,
    fontSize: wp('4%'),
  },
  continueButton: {
    backgroundColor: '#388E3C',
    padding: wp('3+%'),
    borderRadius: 10,
    marginTop: hp('1%'),
    width: '90%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontSize: wp('3%'),
    color: '#777',
    marginVertical: hp('1%'),
  },
  termsLink: {
    color: '#3D7E52',
    textDecorationLine: 'underline',
  },
  googleButton: {
    marginTop: hp('1%'),
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    backgroundColor: 'white',
  },
  googleIcon: {
    width: wp('8%'),
    height: wp('8%'),
  },
  loginText: {
    color: 'black',
    marginTop: hp('1%'),
  },
  loginLink: {
    color: '#388E3C',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: hp("1%")
  }
})