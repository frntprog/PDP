"use client";

import { FC, useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

interface ToxicityProps {
  post: any;
}

const Toxicity: FC<ToxicityProps> = ({ post }) => {
  //   console.log(post);

  const filteredPosts = post.content.blocks.filter(
    (el: any) => el.type == "paragraph"
  );
  let text: any;
  const [status, setStatus] = useState<string>("");
  if (!!filteredPosts.length) {
    text = filteredPosts[0].data.text;
    console.log(text);
    const threshold = 0.9;

    toxicity.load(threshold).then((model) => {
      const sentences = [text];

      model.classify(sentences).then((predictions) => {
        let res = predictions.filter((el) => el.results[0].match == true);
        if (!!res.length) {
          let status = predictions.filter(
            (el) => el.results[0].match == true
          )[0].label;
          setStatus(status);
          console.log(status);
        }
      });
    });
  }

  // return <div>{status}</div>;
  return (
    <div className="bg-red-300 text-white  px-2 py-1 rounded-lg">Offensive</div>
  );
};

export { Toxicity };
