import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import Action from '../redux/actions';

export const useTypedDispatch: () => Dispatch<Action> = useDispatch;
