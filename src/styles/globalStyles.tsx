import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const globalStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.orange_100,
  },

  section: {
    width: '100%',
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  pageTitle: {
    fontSize: 24,
    fontFamily: 'Afacad',
    fontWeight: 'bold',
    color: colors.orange_900,
    textAlign: 'center',
    marginTop: 40,
  },

  m_space: {
    height: 100,
  },

  sm_space: { 
    height: 20,
  },

  sm_title: { 
    fontSize: 20,
    fontFamily: 'Afacad',
    fontWeight: 'bold',
    color: colors.orange_900,
    textAlign: 'left',
    marginBottom: 20,
  },

  loadingContainer: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loading: {
    width: 100,
    height: 100,
  },

  buttonContainer: {
    position: 'absolute',
    right: 30,
    bottom: 130,
    zIndex: 100
  },
})