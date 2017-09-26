import React from "react";
import ReactDOM from "react-dom";
import Helmet from "react-helmet";

import Footer from "../partials/footer";
import Playground from "../partials/playground";
import Seo from "../partials/seo/index";
import config from "../../data/site-config";

export default class DocsTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }

    return (
      <div className="Page-content">
        <Helmet>
          <title>{`${config.siteTitle} |  ${post.title}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Seo postPath={slug} postNode={postNode} postSEO />
        <article className="Article">
          <div className="Recipe Markdown">
            {/* TODO: Add edit this page link once everything is merged to master 
              <a className="SubHeading" href="">Edit this page</a>
            */}
            <Playground 
              html={postNode.html}
              scope={post.scope}
              theme="elegant"
            />
          </div>
        </article>
        <Footer />
      </div>
    );
  }
}

/* eslint-disable no-undef */
export const pageQuery = graphql`
  query DocsBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      tableOfContents
      frontmatter {
        id
        scope
        title
      }
      fields {
        slug
      }
    }
  }
`;
