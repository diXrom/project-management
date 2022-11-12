import { memo } from 'react';
import { FaLanguage } from 'react-icons/fa';
import Button from 'shared/components/Button';
import { useAppDispatch, useAppSelector } from 'shared/store/model/hooks';
import { toggleLang } from 'shared/store/model/langSlice';
import { getLang } from 'shared/store/model/selectors';

const LangSwitcher = () => {
  const lng = useAppSelector(getLang);
  const dispatch = useAppDispatch();

  return (
    <Button
      className="flex items-center gap-1 !border !border-white"
      onClick={() => dispatch(toggleLang(lng === 'EN' ? 'RU' : 'EN'))}
    >
      <FaLanguage className="w-5 h-5" /> {lng}
    </Button>
  );
};

export default memo(LangSwitcher);
