import { useState } from "react";

type Props = {
  onSearch: (query: string, includeAdult: boolean, language: string) => void;
};

const MovieFilter = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, includeAdult, language);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4 bg-white rounded shadow">
      {/* 인풋, 체크박스, 셀렉트 등등 여기 구현 */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="영화 제목을 입력하세요"
        className="p-2 mr-2 border rounded"
      />
      <label className="mr-2">
        <input
          type="checkbox"
          checked={includeAdult}
          onChange={() => setIncludeAdult(!includeAdult)}
        />
        성인 콘텐츠 포함
      </label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="ko-KR">한국어</option>
        <option value="en-US">영어</option>
        <option value="ja-JP">일본어</option>
      </select>
      <button type="submit" className="px-4 py-2 ml-2 text-white bg-blue-500 rounded">
        🔍 검색하기
      </button>
    </form>
  );
};