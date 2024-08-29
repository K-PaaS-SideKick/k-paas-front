import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import LandingPresentation from "./LandingPresentation";
import { useNavigate } from "react-router-dom";

const LandingContainer: React.FC = () => {
  interface Post {
    id: number;
    title: string;
    content: string;
    categories: string[];
    views: number;
  }

  const dummyPosts: Post[] = [
    {
      id: 1,
      title: "현대 사회와 인공지능의 역할1",
      content:
        "인공지능은 현대 사회에서 필수적인 기술로 자리 잡고 있습니다. 초기에 단순한 자동화 기술로 시작했지만, 이제는 머신러닝과 딥러닝을 통해 스스로 학습하고 발전하는 단계에 이르렀습니다. 의료, 금융, 교육, 제조업 등 다양한 산업에서 인공지능을 활용한 혁신적인 기술이 도입되며, 이를 통해 효율성이 크게 향상되고 있습니다. 그러나 인공지능의 발전은 윤리적 문제와 일자리 감소 등 새로운 도전과제를 함께 수반하고 있어, 이에 대한 사회적 논의가 필요합니다. 앞으로 인공지능이 어떤 방향으로 발전할지, 그 결과가 우리 삶에 어떤 영향을 미칠지에 대한 관심이 점점 더 커지고 있습니다.",
      categories: ["Python"],
      views: 100,
    },
    {
      id: 2,
      title: "건강한 식습관의 중요성2",
      content:
        "건강한 식습관은 신체적, 정신적 건강을 유지하는 데 중요한 역할을 합니다. 하루 세 끼 규칙적인 식사와 함께 다양한 영양소를 고르게 섭취하는 것이 필요합니다. 특히, 신선한 채소와 과일, 단백질이 풍부한 식품을 중심으로 한 식단은 면역력을 높이고, 각종 질병을 예방하는 데 도움을 줍니다. 반면, 과도한 가공식품이나 당분, 지방이 많은 음식은 비만, 당뇨, 고혈압 등 여러 건강 문제를 일으킬 수 있습니다. 따라서 올바른 식습관을 형성하는 것이 중요하며, 이는 장기적으로 건강한 삶을 유지하는 데 필수적인 요소로 작용합니다.",
      categories: ["Java", "머신러닝"],
      views: 80,
    },
    {
      id: 3,
      title: "환경 보호와 지속 가능한 미래3",
      content:
        "지구의 환경은 인간의 활동으로 인해 심각하게 훼손되고 있습니다. 기후 변화, 해양 오염, 산림 파괴 등은 지구 생태계에 치명적인 영향을 미치고 있으며, 이는 인류의 미래에도 큰 위협이 됩니다. 환경 보호는 더 이상 선택이 아닌 필수적인 과제가 되었으며, 이를 위해 개인과 기업, 정부 모두가 함께 노력해야 합니다. 자원 절약, 재활용, 친환경 에너지 사용 등 지속 가능한 방식으로 삶을 영위하는 것이 중요합니다. 우리의 작은 실천이 모여 지구의 건강을 회복시키고, 미래 세대에게 깨끗한 환경을 물려줄 수 있습니다.",
      categories: ["JavaScript", "웹 개발"],
      views: 120,
    },
    {
      id: 4,
      title: "여행과 문화 체험의 가치4",
      content:
        "여행은 단순한 휴식 이상의 의미를 지닙니다. 새로운 장소를 방문하고 다양한 문화를 체험하는 것은 개인의 시야를 넓히고 삶의 질을 향상시키는 중요한 경험이 됩니다. 여행을 통해 우리는 다른 지역의 전통, 관습, 음식 등을 직접 경험하며, 이를 통해 타인의 삶을 이해하고 존중하는 법을 배울 수 있습니다. 또한, 여행은 일상의 스트레스에서 벗어나 새로운 에너지를 충전하는 기회를 제공합니다. 이러한 경험은 개인의 성장뿐만 아니라, 전반적인 삶의 만족도를 높이는 데 중요한 역할을 합니다.",
      categories: ["C++", "머신러닝"],
      views: 90,
    },
    {
      id: 5,
      title: "자기 개발과 목표 설정의 중요성5",
      content:
        "자기 개발은 개인의 잠재력을 극대화하고 삶의 질을 높이는 데 중요한 요소입니다. 이를 위해서는 먼저 명확한 목표를 설정하고, 그 목표를 달성하기 위한 구체적인 계획을 세우는 것이 필요합니다. 목표 설정은 삶의 방향성을 제공하며, 도전과 성취를 통해 자기 만족감을 얻을 수 있습니다. 또한, 자기 개발은 학습과 경험을 통해 이루어지며, 이는 개인의 역량을 강화하고 더 나은 기회를 창출하는 데 도움을 줍니다. 꾸준한 노력과 자기 개발을 통해 우리는 보다 풍요롭고 의미 있는 삶을 살아갈 수 있습니다.",
      categories: ["C++"],
      views: 90,
    },
  ];
  const {
    isOpen: isPostModalOpen,
    onOpen: onPostModalOpen,
    onClose: onPostModalClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    onPostModalOpen();
    // Increase view count
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id ? { ...p, views: p.views + 1 } : p
      )
    );
  };

  return (
    <LandingPresentation
      navigate={navigate}
      post={dummyPosts}
      handlePostClick={handlePostClick}
      isPostModalOpen={isPostModalOpen}
      onPostModalClose={onPostModalClose}
      selectedPost={selectedPost}
    />
  );
};

export default LandingContainer;
