/*
 * Copyright 2019 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { property, subclass } from "esri/core/accessorSupport/decorators";
import PortalGroup from "esri/portal/PortalGroup";
import PortalItem from "esri/portal/PortalItem";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";

interface MainMenu {
  label: string;
  iconName: string;
  onClick: (element: HTMLElement) => void;
}

export interface Operation {
  cancel(): void;
}

export interface GalleryProperties extends __esri.WidgetProperties {
  group: PortalGroup;
}

@subclass("app.gallery")
export default class Gallery extends Widget {
  @property()
  public group: PortalGroup;

  @property()
  private items: PortalItem[] = [];

  constructor(properties: GalleryProperties) {
    super(properties);
  }

  postInitialize() {
    this.loadItems();
  }

  public render() {
    const items = this.items.map((item) => {
      const url =
        item.type === "Web Scene"
          ? item.portal.url + "/home/webscene/viewer.html?webscene=" + item.id
          : item.url;
      const hasSource = 0 <= item.tags.indexOf("Open Source");
      const sourceUrl = "https://github.com/esri";
      return (
        <div class="card block trailer-1" key={item.id}>
          <figure class="card-image-wrap">
            <img
              class="card-image"
              src={item.getThumbnailUrl()}
              alt={item.title}
            />
            <div class="card-image-caption">{item.type}</div>
          </figure>
          <div class="card-content">
            <h4>
              <a href={url} target="_blank">
                {item.title}
              </a>
            </h4>
            <p class="font-size--1 card-last">{item.snippet || " "}</p>
            {hasSource ? (
              <div class="leader-quarter">
                <a href={sourceUrl} target="_blank">
                  <span
                    class="icon-social-github"
                    aria-label="Open Source"
                  ></span>
                </a>
              </div>
            ) : (
              ""
            )}
            <a href={url} target="_blank" class="btn btn-fill leader-quarter">
              View
            </a>
          </div>
        </div>
      );
    });

    return (
      <div class="grid-container">
        <div class="column-24">
          <div class="block-group block-group-5-up">{items}</div>
        </div>
      </div>
    );
  }

  private async loadItems() {
    const query = await this.group.queryItems();
    this.items = query.results;
    console.log("Loaded items", { items: this.items });
  }
}
